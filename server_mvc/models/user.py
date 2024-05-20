from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import CreatedUpdatedAtMixin

class User(CreatedUpdatedAtMixin):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(primary_key=True)
    username: Mapped[str | None] = mapped_column(unique=True)
    password: Mapped[str]
    email: Mapped[str]
    
    images: Mapped[List["Image"]] = relationship()