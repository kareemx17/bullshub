from sqlalchemy import Column, Integer, String, JSON
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class ProductDB(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    data = Column(JSON)
