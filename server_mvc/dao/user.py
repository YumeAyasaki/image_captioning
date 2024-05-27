from sqlalchemy.orm.session import Session
import bcrypt # Remember to change hashing to client

from models.user import User as UserModel
from dto.user import User as UserDto
from .base import Dao

class UserDao(Dao[UserModel, UserDto]):
    def __init__(self, session: Session):
        super().__init__(session, UserModel, UserDto)
        
    def to_secured_dto(self, model: UserModel): # Remove password field
        dto = self.to_dto(model)
        dto.password = ' '
        return dto
    
    def check_password(self, username: str, password: str):
        model = self.session.query(self.model_cls).filter_by(username=username).first()
        if model == None:
            return False
        if not bcrypt.checkpw(password.encode('utf-8'), model.password.encode('utf-8')):
            return False
        return True
        
    def get_one_by_id(self, user_id: str):
        model = self.session.query(self.model_cls).get(user_id)
        return self.to_secured_dto(model) if model else None
    
    def get_one_by_username(self, username: str):
        model = self.session.query(self.model_cls).filter_by(username=username).first()
        return self.to_secured_dto(model) if model else None
        
    def get_all(self):
        models = self.session.query(self.model_cls).all()
        return [self.to_secured_dto(model) for model in models]
        
    def delete(self, user_id: str):
        model = self.session.get(self.model_cls, user_id)
        if model:
            self.session.delete(model)
            self.session.commit()