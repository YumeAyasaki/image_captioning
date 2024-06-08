from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker

from models.base import BaseModel

def create_session_maker(database_url: str) -> sessionmaker:
    engine = create_engine(
        database_url,
        echo=True,
        pool_size=15,
        max_overflow=15,
        connect_args={
            "connect_timeout": 5,
        },
    )
    BaseModel.metadata.create_all(engine)
    return sessionmaker(engine, autoflush=False, expire_on_commit=False)