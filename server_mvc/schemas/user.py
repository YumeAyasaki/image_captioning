from pydantic import BaseModel, EmailStr, Field, ConfigDict

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)
    email: EmailStr = Field(...)
    
class User(UserCreate):
    id: str
    model_config = ConfigDict(from_attributes=True)