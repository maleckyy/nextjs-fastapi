import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Null, Text, Time, Enum
from sqlalchemy.orm import relationship
from enums.expense_enum import ExpenseType
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

    event = relationship(
        "Events",
        back_populates="user",
        cascade="all, delete",
    )

    details = relationship(
        "UserDetails", 
        back_populates="user", 
        uselist=False, 
        cascade="all, delete-orphan"
    )

    expense = relationship(
        "Expense", 
        back_populates="user", 
        cascade="all, delete-orphan"
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

class Events(Base):
    __tablename__ = "events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    event_date = Column(DateTime, nullable=False, default=datetime.utcnow)

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user = relationship("Users", back_populates="event")

class UserDetails(Base):
    __tablename__ = 'user_details'

    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    description = Column(Text, nullable=True) # Długi tekst, np. "O mnie"
    phone_number = Column(String(20), nullable=True)
    address = Column(String, nullable=True)
    country = Column(String, nullable=True)

    # zdjecie ogarnac

    user = relationship("Users", back_populates="details")

class Expense(Base):
    __tablename__ = 'expense'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    expense_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    expense_type = Column(Enum(ExpenseType, name="expense_type"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user = relationship("Users", back_populates="expense")
