from pydantic import TypeAdapter
from sqlalchemy.exc import IntegrityError
import uuid
import bcrypt
import jwt
import os # Find a better way to handle loading secret from config/environment

from models.user import User as UserModel
from schemas.user import User, UserCreate, UserLogin
from .base import Controller

class UserController(Controller[UserModel]):
    def create_user(self, user: UserCreate): # Use for register
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
            
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            
            return User(id=user_id, username=user.username, email=user.email)
        
        except IntegrityError as e:
            session.rollback()
            raise ValueError(f"Username or email already exists: {e}")
        
    def login(self, user: UserLogin):
        session = self.session
        try:
            db_user = session.query(UserModel).filter(UserModel.username == user.username).first()
            
            if not db_user:
                raise ValueError("Invalid username")

            if not bcrypt.checkpw(user.password.encode('utf-8'), db_user.password.encode('utf-8')):
                raise ValueError("Invalid password")
            
            secret = os.environ.get('secret')
            
            token = jwt.encode({
                'id': db_user.id,
            }, secret, algorithm='HS256')

            # Implement your success logic here (e.g., generate token)
            return User(id=db_user.id, username=db_user.username, email=db_user.email), token

        except Exception as e:
            # Handle any potential errors
            raise ValueError(f"Login failed: {e}")
        
    def get_user_from_token(self, token: str):
        session = self.session
        try:
            secret = os.environ.get('secret')
            data = jwt.decode(token, secret, algorithms=['HS256'])
            
            db_user = session.query(UserModel).filter(UserModel.id == data['id']).first()
            return User(id=db_user.id, username=db_user.username, email=db_user.email)
        except Exception as e:
            raise ValueError(f"Retrieve user failed: {e}")