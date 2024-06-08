import sys
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, ForeignKey
from sqlalchemy.orm import validates, relationship

import uuid
from datetime import datetime

from database import db

class Image(db.Base):
    __tablename__ = 'images'
    
    id = Column(String, primary_key=True)
    # Basic image information
    title = Column(String, nullable=False)    
    url = Column(String, nullable=True)
    image_file = Column(String, nullable=True)    
    annotation = Column(String, nullable=False)
    
    # Other image information
    user_id = Column(String, ForeignKey('users.id'))
    user = relationship('User', back_populates='images')
    
    def __init__(self, data):
        self.id = str(uuid.uuid4())
        self.title = data['title']
        
        # Check if there's none of them
        if not data['url'] and not data['image_file']:
            raise ValueError("Either 'url' or 'image_file' must be provided")
        self.url = data['url']
        self.image_file = data['image_file']
        
        self.annotation = data['annotation']
        
    def __repr__(self):
        return f'<Image {self.title}>'
    
    def link_user(self, user):
        self.user = user
        self.user_id = user.id
        
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'url': self.url,
            'image_file': self.image_file,
            'annotation': self.annotation,
        }
