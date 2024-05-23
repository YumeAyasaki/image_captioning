from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import CreatedUpdatedAtMixin

class Image(CreatedUpdatedAtMixin):
    __tablename__ = "images"

    id: Mapped[str] = mapped_column(primary_key=True)
    title: Mapped[str]
    url: Mapped[str | None]
    image_file: Mapped[str | None]
    annotation: Mapped[str]
    
    user_id: Mapped[str] = mapped_column(ForeignKey('users.id'))