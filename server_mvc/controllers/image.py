import uuid

from models.image import Image as ImageModel
from dto.image import Image, ImageCreate
from dto.user import User
from .base import Controller
from dao.image import ImageDao

class ImageController(Controller[ImageModel]):
    def add(self, image: ImageCreate, user: User):
        session = self.session
        try:
            new_image = ImageModel(
                id=str(uuid.uuid4()),
                title=image.title,
                url=image.url,
                image_file=image.image_file,
                annotation=image.annotation,
                user_id=user.id,
            )
            
            session.add(new_image)
            session.commit()
            session.refresh(new_image)
            return Image(id=new_image.id,
                title=new_image.title,
                url=new_image.url,
                image_file=new_image.image_file,
                annotation=new_image.annotation,
                user_id=new_image.user_id,
            )
        except Exception as e:
            session.rollback()
            raise ValueError(f"Can't add image: {e}")

    def get_all(self, user: User):
        session = self.session
        try:
            db_images = session.query(ImageModel).filter(ImageModel.user_id == user.id)
            print(db_images)
            images = [Image(id=image.id,
                title=image.title,
                url=image.url,
                image_file=image.image_file,
                annotation=image.annotation,
                user_id=image.user_id,
            ) for image in db_images]
            return images
            
        except Exception as e:
            raise ValueError(f"Can't fetch value: {e}")
        
    def delete(self, image_id: str, user: User):
        session = self.session
        try:
            image_to_delete = session.query(ImageModel).filter(
                ImageModel.id == image_id, ImageModel.user_id == user.id
            ).first()
            if image_to_delete is None:
                raise ValueError(f"Image with id {image_id} not found for user {user.id}")
            session.delete(image_to_delete)
            session.commit()
            return {"message": "Image deleted successfully"}
        except Exception as e:
            session.rollback()
            raise ValueError(f"Can't delete image: {e}")
        
    def edit(self, image_id: str, image_data: Image, user: User):
        session = self.session
        try:
            image_to_edit = session.query(ImageModel).filter(
                ImageModel.id == image_id, ImageModel.user_id == user.id
            ).first()
            if image_to_edit is None:
                raise ValueError(f"Image with id {image_id} not found for user {user.id}")

            # Update attributes based on provided data (be cautious about updating sensitive fields)
            image_to_edit.title = image_data.title if image_data.title else image_to_edit.title
            image_to_edit.url = image_data.url if image_data.url else image_to_edit.url
            image_to_edit.image_file = image_data.image_file if image_data.image_file else image_to_edit.image_file
            image_to_edit.annotation = image_data.annotation if image_data.annotation else image_to_edit.annotation

            session.commit()
            return Image(id=image_to_edit.id,
                title=image_to_edit.title,
                url=image_to_edit.url,
                image_file=image_to_edit.image_file,
                annotation=image_to_edit.annotation,
                user_id=image_to_edit.user_id,
            )
        except Exception as e:
            session.rollback()
            raise ValueError(f"Can't edit image: {e}")