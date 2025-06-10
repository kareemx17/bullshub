import models
from database import Base, engine, SessionLocal, get_db
from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form, status, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
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
import models as models
import database as database
from database import engine, get_db
from models import User, ProductDB

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Environment variables for deployment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# JWT configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Add request logging middleware (only in development)
if ENVIRONMENT == "development":
    class LoggingMiddleware(BaseHTTPMiddleware):
        async def dispatch(self, request: Request, call_next):
            print(f"Incoming request: {request.method} {request.url}")
            print(f"Headers: {dict(request.headers)}")
            response = await call_next(request)
            print(f"Response status: {response.status_code}")
            return response

    app.add_middleware(LoggingMiddleware)

# Enable CORS - more flexible for deployment
allowed_origins = [
    "http://localhost:5173", 
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
]

# Add frontend URL if provided
if FRONTEND_URL and FRONTEND_URL not in allowed_origins:
    allowed_origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
os.makedirs("uploads", exist_ok=True)

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
    try:
        if query:
            # Get all products and filter in Python since JSON filtering can be unreliable in SQLite
            all_products = db.query(ProductDB).all()
            filtered_products = []
            
            for product in all_products:
                try:
                    data = json.loads(product.data)
                    # Search in title, description, and category
                    search_text = f"{data.get('title', '')} {data.get('description', '')} {data.get('category', '')}".lower()
                    if query.lower() in search_text:
                        filtered_products.append(Product(id=product.id, **data))
                except json.JSONDecodeError:
                    continue
            
            return filtered_products
        else:
            # Return all products if no query
            products = db.query(ProductDB).all()
            return [Product(id=p.id, **json.loads(p.data)) for p in products]
            
    except Exception as e:
        print(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

# Optional: Add some initial data
@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
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
            ProductDB(id="3", data=json.dumps({
                "title": "Calculus Early Transcendentals",
                "price": "$45",
                "description": "8th edition, James Stewart. Some highlighting but in great condition. Perfect for Calc 1-3.",
                "category": "books",
                "image": "https://m.media-amazon.com/images/I/91eEDkBqO-L.jpg",
                "contact": "email:sarah.math@usf.edu"
            })),
            ProductDB(id="4", data=json.dumps({
                "title": "TI-84 Plus Calculator",
                "price": "$50",
                "description": "Barely used TI-84 Plus graphing calculator. Comes with batteries and case.",
                "category": "electronics",
                "image": "https://m.media-amazon.com/images/I/71yrLllDokL._AC_UF894,1000_QL80_.jpg",
                "contact": "instagram:calc_dealer"
            })),
            ProductDB(id="5", data=json.dumps({
                "title": "Chemistry Lab Goggles",
                "price": "$5",
                "description": "Used for one semester only. Still in perfect condition. Required for CHM 2045L.",
                "category": "lab equipment",
                "image": "https://m.media-amazon.com/images/I/71y29kw+PZL.jpg",
                "contact": "email:chem.student@usf.edu"
            })),
            ProductDB(id="6", data=json.dumps({
                "title": "Physics Fundamentals",
                "price": "$30",
                "description": "Physics for Scientists and Engineers, 10th Edition. Some wear but all pages intact.",
                "category": "books",
                "image": "https://m.media-amazon.com/images/I/71HdgTLGUSL._AC_UF1000,1000_QL80_.jpg",
                "contact": "instagram:physics_guru"
            })),
            ProductDB(id="7", data=json.dumps({
                "title": "Arduino Starter Kit",
                "price": "$25",
                "description": "Complete Arduino kit used for EGN 3000. Includes board, sensors, and components.",
                "category": "electronics",
                "image": "https://m.media-amazon.com/images/I/81a-MDAmb8L.jpg",
                "contact": "email:maker.space@usf.edu"
            })),
            ProductDB(id="8", data=json.dumps({
                "title": "Study Desk",
                "price": "$15",
                "description": "Compact study desk, perfect for dorm room. Easy to assemble/disassemble.",
                "category": "furniture",
                "image": "https://m.media-amazon.com/images/I/71CkxVHzuGL._AC_UF894,1000_QL80_.jpg",
                "contact": "instagram:dorm_deals"
            })),
            ProductDB(id="9", data=json.dumps({
                "title": "Biology Lab Manual",
                "price": "free",
                "description": "BSC 2010L lab manual. Unused, got it for free from a friend but dropped the class.",
                "category": "books",
                "image": "https://m.media-amazon.com/images/I/815jJO25vdL._AC_UF1000,1000_QL80_.jpg",
                "contact": "email:bio.student@usf.edu"
            })),
            ProductDB(id="10", data=json.dumps({
                "title": "Engineering Drawing Set",
                "price": "$12",
                "description": "Professional drawing set with compass, rulers, and protractors. Used for EGN 3311.",
                "category": "supplies",
                "image": "https://m.media-amazon.com/images/I/71pO+zpB8hL.jpg",
                "contact": "instagram:engineering_supplies"
            })),
            ProductDB(id="11", data=json.dumps({
                "title": "Computer Science Notes",
                "price": "free",
                "description": "Complete set of typed notes for COP 3514 and COP 4530. Includes practice problems.",
                "category": "study materials",
                "image": "https://notesdrive.com/wp-content/uploads/2022/05/2.png",
                "contact": "email:cs.notes@usf.edu"
            })),
            ProductDB(id="12", data=json.dumps({
                "title": "Dorm Mini Fridge",
                "price": "$40",
                "description": "1.7 cu ft mini fridge, perfect working condition. Moving out of dorms.",
                "category": "appliances",
                "image": "https://dormessentials.hsa.net/cdn/shop/products/microfridge1_2568df25-de21-4eb5-8682-614dc5a3221d.jpg?v=1622426926&width=1214",
                "contact": "instagram:dorm_essentials"
            }))
        ]
    
    # Clear existing products and add new ones
    db.query(ProductDB).delete()
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
        "contact": contact,
        "created_at": datetime.utcnow().isoformat()
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

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

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

# User Profile Endpoints
class UserProfileUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    full_name: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None

@app.get("/user/profile")
def get_user_profile(current_user: models.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "bio": current_user.bio,
        "location": current_user.location,
        "created_at": current_user.created_at
    }

@app.put("/user/profile")
def update_user_profile(
    profile_data: UserProfileUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update only provided fields
    if profile_data.username is not None:
        # Check if username is already taken
        existing_user = db.query(models.User).filter(
            models.User.username == profile_data.username,
            models.User.id != current_user.id
        ).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already taken")
        user.username = profile_data.username
    
    if profile_data.email is not None:
        user.email = profile_data.email
    
    if profile_data.full_name is not None:
        user.full_name = profile_data.full_name
    
    if profile_data.bio is not None:
        user.bio = profile_data.bio
    
    if profile_data.location is not None:
        user.location = profile_data.location
    
    db.commit()
    db.refresh(user)
    
    return {
        "message": "Profile updated successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "bio": user.bio,
            "location": user.location,
            "created_at": user.created_at
        }
    }

@app.post("/populate-demo-data")
async def populate_demo_data(db: Session = Depends(get_db)):
    # Clear existing products
    db.query(ProductDB).delete()
    
    initial_products = [
        # ... paste the same products array from the startup_event ...
    ]
    
    db.add_all(initial_products)
    db.commit()
    return {"message": "Demo data populated successfully"}

