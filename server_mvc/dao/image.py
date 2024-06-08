from sqlalchemy.orm.session import Session

from models.image import Image as ImageModel
from dto.image import Image as ImageDto
from .base import Dao

class ImageDao(Dao[ImageModel, ImageDto]):
    def __init__(self, session: Session):
        super().__init__(session, ImageModel, ImageDto)

    def get_one_by_id(self, image_id: str):
        model = self.session.query(self.model_cls).get(image_id)
        return self.to_dto(model) if model else None
        
    def get_all(self):
        models = self.session.query(self.model_cls).all()
        return [self.to_dto(model) for model in models]
    
    def get_all_from_user(self, user_id: str):
        models = self.session.query(self.model_cls).filter(self.model_cls.user_id == user_id).all()
        return [self.to_dto(model) for model in models]
        
    def delete(self, image_id):
        model = self.session.get(self.model_cls, image_id)
        if model:
            self.session.delete(model)
            self.session.commit()