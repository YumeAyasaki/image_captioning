from pydantic import BaseModel, EmailStr, Field

from .base import BaseDto

class User(BaseDto):
    id: str
    username: str = Field(...)
    password: str = Field(...)
    email: EmailStr = Field(...)

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)
    email: EmailStr = Field(...)
    
class UserLogin(BaseModel):
    username: str = Field(...)
    password: str = Field(...)