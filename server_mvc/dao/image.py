from models.image import Image as ImageModel
from dto.image import Image as ImageDto
from .base import Dao

class ImageDao(Dao[ImageModel, ImageDto]):
    def get_one_by_id(self, image_id: str):
        model = self.session.query(self.model).get(image_id)
        return self.to_dto(model) if model else None
        
    def get_all(self):
        models = self.session.query(self.model).all()
        return [self.to_dto(model) for model in models]
        
    def delete(self, image_id):
        model = self.session.get(self.model, image_id)
        if model:
            self.session.delete(model)
            self.session.commit()