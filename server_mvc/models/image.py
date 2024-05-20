from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import CreatedUpdatedAtMixin

class Image(CreatedUpdatedAtMixin):
    __tablename__ = "images"

    id: Mapped[str] = mapped_column(primary_key=True)
    title: Mapped[str | None] = mapped_column(unique=True)
    data: Mapped[str]
    annotation: Mapped[str]
    
    user_id: Mapped[str] = mapped_column(ForeignKey('users.id'))