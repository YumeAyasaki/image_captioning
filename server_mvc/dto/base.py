from pydantic import BaseModel, Field, ConfigDict

class BaseDto(BaseModel):
    model_config = ConfigDict(from_attributes=True) # To convert from model to dto
    id: str = Field(...)