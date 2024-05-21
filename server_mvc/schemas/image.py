from pydantic import BaseModel, Field

class Image(BaseModel):
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