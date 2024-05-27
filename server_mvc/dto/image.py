from typing import List
from pydantic import BaseModel, Field

from .base import BaseDto

class Image(BaseDto):
    id: str = Field(...)
    url: str = Field(...)
    image_file: str = Field(...)
    annotation: List[str] = Field(...)
    user_id: str = Field(...)
    
class ImageCreate(BaseModel):
    url: str = Field(...)
    image_file: str = Field(...)
    annotation: List[str] = Field(...)
    
class ImageUpdate(BaseModel):
    url: str = Field(...)
    image_file: str = Field(...)
    annotation: List[str] = Field(...)