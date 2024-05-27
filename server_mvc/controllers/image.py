from models.image import Image as ImageModel
from dto.image import Image, ImageCreate, ImageUpdate
from dto.user import User
from .base import Controller
from dao.image import ImageDao

class ImageController(Controller[ImageModel]):
    def add(self, image: ImageCreate, user: User):
        session = self.session
        try:
            new_image = Image(
                id='',
                url=image.url,
                image_file=image.image_file,
                annotation=image.annotation,
                user_id=user.id,
            )
            
            image_dao = ImageDao(session)
            return image_dao.create(new_image)

        except Exception as e:
            session.rollback()
            raise ValueError(f"Can't add image: {e}")

    def get_all_from_user(self, user: User):
        session = self.session
        try:
            image_dao = ImageDao(session)
            return image_dao.get_all_from_user(user.id)
            
        except Exception as e:
            raise ValueError(f"Can't fetch value: {e}")
        
    def delete(self, image_id: str, user: User):
        session = self.session
        try:
            image_dao = ImageDao(session)
            image_to_delete = image_dao.get_one_by_id(image_id)
            if image_to_delete is None:
                raise ValueError(f"Can't find image: {e}")
            if image_to_delete.user_id != user.id:
                raise ValueError(f"Image doesn't belong to user: {e}")
            return image_dao.delete(image_id)
        except Exception as e:
            raise ValueError(f"Can't delete image: {e}")
        
    def edit(self, image_id: str, image_data: ImageUpdate, user: User):
        session = self.session
        try:
            image_dao = ImageDao(session)
            image_to_edit = image_dao.get_one_by_id(image_id)
            if image_to_edit is None:
                raise ValueError(f"Can't find image: {e}")
            if image_to_edit.user_id != user.id:
                raise ValueError(f"Image doesn't belong to user: {e}")
            image_dto = Image(**image_data.model_dump(), user_id=user.id, id=image_id)
            return image_dao.update(image_dto)
        except Exception as e:
            raise ValueError(f"Can't edit image: {e}")
        
    def get_one(self, image_id: str):
        session = self.session
        try:
            image_dao = ImageDao(session)
            return image_dao.get_one_by_id(image_id)
        except Exception as e:
            raise ValueError(f"Can't fetch image: {e}")
        
    def get_all(self):
        session = self.session
        try:
            image_dao = ImageDao(session)
            return image_dao.get_all()
        except Exception as e:
            raise ValueError(f"Can't fetch image: {e}")