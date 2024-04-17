import sys
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float
from sqlalchemy.orm import validates, relationship
import bcrypt  # For hashing passwords
import uuid
from datetime import datetime

from database import db

class User(db.Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    # Basic user information
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False)

    # Other user information
    last_login = Column(DateTime)
    is_admin = Column(Boolean)
    is_active = Column(Boolean)
    date_joined = Column(DateTime)

    # Data stored things
    # List of image and its annotations
    images = relationship('Image', back_populates='user')
    
    def __init__(self, data):
        self.id = str(uuid.uuid4())
        self.username = data['username']
        self.password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        self.email = data['email']
        self.last_login = datetime.now()
        self.is_admin = False
        self.is_active = True
        self.date_joined = datetime.now()
        
    def __repr__(self):
        return f'<User {self.username}>'
    
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided')
        if len(username) < 5:
            raise AssertionError('Username must be 5 characters or more')
        return username
    
    @validates('password')
    def validate_password(self, key, password):
        print(password)
        if len(password) < 5:
            raise AssertionError('Password must be 5 characters or more')
        return password
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise AssertionError('No email provided')
        return email
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def add_image(self, image):
        self.images.append(image)
        return self
    
    def simple_user(self):
        return {
            'username': self.username,
            'email': self.email,
        }