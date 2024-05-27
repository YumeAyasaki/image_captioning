from sqlalchemy import ForeignKey, ARRAY, String
from sqlalchemy.orm import Mapped, mapped_column

from .base import CreatedUpdatedAtMixin

class Image(CreatedUpdatedAtMixin):
    __tablename__ = "images"

    url: Mapped[str | None]
    image_file: Mapped[str | None]
    annotation: Mapped[list[str]] = mapped_column(ARRAY(String))
    
    user_id: Mapped[str] = mapped_column(ForeignKey('users.id'))