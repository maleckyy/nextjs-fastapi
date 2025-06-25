import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Null, Time
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone

class Users(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    username = Column(String, index=True)
    email = Column(String)
    password_hash = Column(String)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    todos = relationship(
        "TodoList",
        back_populates="user",
        cascade="all, delete",
    )
    token = relationship(
        "UserToken",
        back_populates="user",
        cascade="all, delete",
        uselist=False
    )

class TodoList(Base):
    __tablename__ = 'todo_list'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    is_done = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user = relationship("Users", back_populates="todos")

class UserToken(Base):
    __tablename__ = 'user_token'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    access_token = Column(String, nullable=True)
    refresh_token = Column(String, nullable=True)
    token_expires_time = Column(Integer, nullable=True)

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user = relationship("Users", back_populates="token")