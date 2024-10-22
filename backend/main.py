from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, Field
from typing import List, Optional
import json
import uuid
import os
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import timedelta, datetime
from . import models, database
from .database import engine, get_db

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Product model for database
class ProductDB(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    data = Column(JSON)

# Create tables
Base.metadata.create_all(bind=engine, checkfirst=True)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for API
class Product(BaseModel):
    id: str
    title: str
    price: str
    description: str
    category: str
    image: str
    contact: Optional[str] = None
    email: Optional[str] = None
    instagram: Optional[str] = None

    class Config:
        from_attributes = True

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/products", response_model=List[Product])
async def get_products(db: Session = Depends(get_db)):
    products = db.query(ProductDB).all()
    result = []
    for p in products:
        data = json.loads(p.data)
        if 'contact' not in data:
            # Old format: combine email and instagram into contact
            contact = f"email:{data.get('email', '')}" if data.get('email') else f"instagram:{data.get('instagram', '')}"
            data['contact'] = contact
        result.append(Product(id=p.id, **data))
    return result

@app.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(ProductDB).filter(ProductDB.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(id=product.id, **json.loads(product.data))

@app.get("/search", response_model=List[Product])
async def search_products(query: Optional[str] = None, db: Session = Depends(get_db)):
    if query:
        products = db.query(ProductDB).filter(ProductDB.data['title'].astext.ilike(f"%{query}%")).all()
    else:
        products = db.query(ProductDB).all()
    return [Product(id=p.id, **json.loads(p.data)) for p in products]

# Optional: Add some initial data
@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
    if db.query(ProductDB).count() == 0:
        initial_products = [
            ProductDB(id="1", data=json.dumps({
                "title": "EGN lab kit",
                "price": "free",
                "description": "My lab project kit which i used last semester. still like new. giving it away",
                "category": "project kit",
                "image": "https://i.redd.it/x46dlbbrwn081.jpg",
                "contact": "email:abdukarimkhusenov@usf.edu"
            })),
            ProductDB(id="2", data=json.dumps({
                "title": "Grokking algorithm book",
                "price": "$7.0",
                "description": "Printed version of Grokking Algorithm book. Paper quality is good, you can read the content.",
                "category": "books",
                "image": "https://artemdemo.com/static/bd61bf0968541db117178677c6ea29af/dbdff/grokking-algorithms.jpg",
                "contact": "instagram:ChazSeitz"
            })),
        ]
        db.add_all(initial_products)
        db.commit()
    db.close()

def update_existing_products(db: Session):
    products = db.query(ProductDB).all()
    for product in products:
        data = json.loads(product.data)
        if 'contact' not in data:
            if 'email' in data:
                data['contact'] = f"email:{data['email']}"
                del data['email']
            elif 'instagram' in data:
                data['contact'] = f"instagram:{data['instagram']}"
                del data['instagram']
            product.data = json.dumps(data)
    db.commit()

# Call this function after your database is set up
update_existing_products(SessionLocal())

@app.post("/products")
async def create_product(
    title: str = Form(...),
    price: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    contact: str = Form(...),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Generate a unique ID
    product_id = str(uuid.uuid4())

    # Ensure the uploads directory exists
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    if photo.filename:  # If a file was uploaded
        # Generate a unique filename
        file_extension = os.path.splitext(photo.filename)[1]
        file_name = f"{product_id}{file_extension}"
        file_path = os.path.join(upload_dir, file_name)
        
        # Save the file
        with open(file_path, "wb+") as file_object:
            file_object.write(await photo.read())
        
        # Store just the filename
        image_path = file_name
    else:
        # If no file was uploaded, assume the 'photo' field contains a URL
        image_path = photo

    # Create product data
    product_data = {
        "title": title,
        "price": price,
        "description": description,
        "category": category,
        "image": image_path,
        "contact": contact
    }

    # Create new product
    new_product = ProductDB(id=product_id, data=json.dumps(product_data))
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {"message": "Product created successfully", "product_id": product_id}

@app.delete("/products/{product_id}")
async def delete_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(ProductDB).filter(ProductDB.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Delete the associated image file
    product_data = json.loads(product.data)
    image_path = product_data.get('image')
    if image_path and os.path.exists(image_path):
        os.remove(image_path)
    
    # Delete the product from the database
    db.delete(product)
    db.commit()
    
    return {"message": "Product deleted successfully"}

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Secret key to sign the JWT tokens
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



# Helper functions
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Routes
@app.post("/register")
def register(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = get_user(db, form_data.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(form_data.password)
    new_user = models.User(username=form_data.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/logout")
def logout():
    # In a stateless JWT system, logout is typically handled client-side
    # by removing the token from storage (e.g., localStorage)
    return {"message": "Logout successful"}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(db, username)
    if user is None:
        raise credentials_exception
    return user

@app.get("/protected")
def protected(current_user: models.User = Depends(get_current_user)):
    return {"user": current_user.username, "message": "You are authenticated"}

# Add this to your existing routes to make them protected
# @app.get("/products")
# def get_products(Authorize: AuthJWT = Depends()):
#     Authorize.jwt_required()
#     # ... rest of your function
