from flask import Flask
from sqlalchemy.orm.session import sessionmaker

from .database import DatabaseMiddleware
from .caption import CaptioningMiddleware

def register(app: Flask, session_maker: sessionmaker) -> None:
    DatabaseMiddleware(session_maker).register(app)
    # CaptioningMiddleware().register(app)