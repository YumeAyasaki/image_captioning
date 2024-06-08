import bcrypt
import jwt
import os # Find a better way to handle loading secret from config/environment

from models.user import User as UserModel
from dto.user import User, UserCreate, UserLogin
from .base import Controller
from dao.user import UserDao

class UserController(Controller[UserModel]):
    def create_user(self, user: UserCreate): # Use for register
        session = self.session
        try:
            hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            new_user = User(
                id='',
                username=user.username,
                password=hashed_password,
                email=user.email,
            )
            user_dao = UserDao(session)
            return user_dao.create(new_user)
        
        except Exception as e:
            raise ValueError(f"Register failed: {e}")
        
    def login(self, user: UserLogin):
        session = self.session
        try:
            user_dao = UserDao(session)
            db_user = user_dao.get_one_by_username(user.username)
            
            if not db_user:
                raise ValueError("Invalid username")
            if not user_dao.check_password(user.username, user.password):
                raise ValueError("Invalid password")
            
            secret = os.environ.get('secret')
            token = jwt.encode({
                'id': db_user.id,
            }, secret, algorithm='HS256')

            return db_user, token

        except Exception as e:
            raise ValueError(f"Login failed: {e}")
        
    def get_user_from_token(self, token: str):
        session = self.session
        try:
            secret = os.environ.get('secret')
            print ("Test token: ",type(token)," ",token)
            data = jwt.decode(token, secret, algorithms=['HS256'])
            user_dao = UserDao(session)
            db_user = user_dao.get_one_by_id(data['id'])
            return db_user
        
        except Exception as e:
            raise ValueError(f"Retrieve user failed: {e}")
