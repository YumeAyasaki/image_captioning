from typing import Generic, TypeVar
from sqlalchemy.orm.session import Session

from models.base import BaseModel
from dto.base import BaseDto

Model = TypeVar("Model", bound=BaseModel)
Dto = TypeVar("Dto", bound=BaseDto)

class Dao(Generic[Model, Dto]):
    def __init__(self, session: Session, model_cls: type[Model], dto_cls: type[Dto]):
        self.session = session
        self.model_cls = model_cls
        self.dto_cls = dto_cls
        
    def to_dto(self, model: Model):
        return self.dto_cls.model_validate(model)
        
    def create(self, data: BaseDto) -> Dto:
        model = self.model_cls.from_dict(data)
        self.session.add(model)
        self.session.commit()
        self.session.refresh(model)

        return self.to_dto(model)

    def update(self, data: BaseDto) -> Dto:
        model = self.session.query(Model).get(data.id)
        if not model:
            raise Exception(f"Model with ID {id} not found")

        # Update attributes using a combination of dictionary unpacking and explicit assignment
        # for clarity and potential validation
        update_data = data.model_dump()(exclude_unset=True)  # Exclude unset fields to avoid overwrites
        for field, value in update_data.items():
            setattr(model, field, value)

        self.session.commit()
        self.session.refresh(model)

        return self.to_dto(model)