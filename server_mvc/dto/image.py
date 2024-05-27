from pydantic import BaseModel, Field

from .base import BaseDto

class Image(BaseDto):
    id: str = Field(...)
    title: str = Field(...)
    url: str = Field(...)
    image_file: str = Field(...)
    annotation: str = Field(...)
    user_id: str = Field(...)
    
class ImageCreate(BaseModel):
    title: str = Field(...)
    url: str = Field(...)
    image_file: str = Field(...)
    annotation: str = Field(...)
    
class ImageUpdate(BaseModel):
    title: str = Field(...)
    url: str = Field(...)
    image_file: str = Field(...)
    annotation: str = Field(...)