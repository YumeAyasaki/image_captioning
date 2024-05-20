from pydantic import TypeAdapter
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
import uuid
import bcrypt

from models.user import User as UserModel
from schemas.user import User, UserCreate

from .base import Controller

class UserController(Controller[UserModel]):
    def create_user(self, user: UserCreate):
        session = self.session
        try:
            user_id = str(uuid.uuid4())
            hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            new_user = UserModel(
                id=user_id,
                username=user.username,
                password=hashed_password,
                email=user.email,
            )
            
            print(new_user)
            
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            
            return TypeAdapter(User).validate_python(new_user)
        
        except IntegrityError as e:
            session.rollback()
            raise ValueError(f"Username or email already exists: {e}")