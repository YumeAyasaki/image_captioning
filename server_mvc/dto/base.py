from pydantic import BaseModel, Field, ConfigDict

class BaseDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str = Field(...)