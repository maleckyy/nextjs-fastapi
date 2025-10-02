import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Table, Text, Enum
from sqlalchemy.orm import relationship, backref
from enums.board_task_priority import BoardTaskPriorityType
from enums.ai_chat_message_type import MessageType
from enums.expense_enum import ExpenseType
from database import Base
from datetime import datetime, timezone

chat_participants = Table(
    "chat_participants",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE")),
    Column("room_id", UUID(as_uuid=True), ForeignKey("chat_rooms.id", ondelete="CASCADE"))
)

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

    user_stack = relationship(
        "UserProfileStack", 
        back_populates="user", 
        uselist=False, 
        cascade="all, delete-orphan"
    )

    expense = relationship(
        "Expense", 
        back_populates="user", 
        cascade="all, delete-orphan"
    )

    experience = relationship(
        "UserProfileExperience", 
        back_populates="user", 
        cascade="all, delete-orphan"
    )

    chat_rooms = relationship(
        "ChatRoom",
        secondary=chat_participants,
        back_populates="participants",
    )

    ai_chat_rooms = relationship(
        "AiChatRoom",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    personal_projects = relationship(
        "ProfilePersonalProjects", 
        back_populates="user", 
        cascade="all, delete-orphan"
    )

    boards = relationship(
        "Boards", 
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
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    phone_number = Column(String(20), nullable=False)
    address = Column(String, nullable=False)
    country = Column(String, nullable=False)
    photo_path = Column(String, nullable=True)

    user = relationship("Users", back_populates="details")

class Expense(Base):
    __tablename__ = 'expense'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    expense_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    expense_type = Column(Enum(ExpenseType, name="expense_type"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user = relationship("Users", back_populates="expense")

class UserProfileStack(Base):
    __tablename__ = "user_stack"

    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    stack = Column(String, nullable=True)
    user = relationship("Users", back_populates="user_stack")

class UserProfileExperience(Base):
    __tablename__ = "user_experience"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    position = Column(String, nullable=False)
    description = Column(String, nullable=True)
    starting_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    ending_date = Column(DateTime, nullable=True)

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user = relationship("Users", back_populates="experience")


class ChatRoom(Base):
    __tablename__ = "chat_rooms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow)

    participants = relationship(
        "Users",
        secondary=chat_participants,
        back_populates="chat_rooms",
        cascade="all, delete",
    )

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    room_id = Column(UUID(as_uuid=True), ForeignKey("chat_rooms.id", ondelete="CASCADE"))
    sender_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    room = relationship("ChatRoom", backref=backref("messages", cascade="all, delete-orphan"))
    sender = relationship("Users")


class AiChatRoom(Base):
    __tablename__ = "ai_chat_rooms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    
    user = relationship("Users", back_populates="ai_chat_rooms")

    messages = relationship("AiChatMessage", back_populates="room", cascade="all, delete-orphan")


class AiChatMessage(Base):
    __tablename__ = "ai_chat_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    room_id = Column(UUID(as_uuid=True), ForeignKey("ai_chat_rooms.id", ondelete="CASCADE"), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    content = Column(String, nullable=False)
    message_type = Column(Enum(MessageType, name="message_type"), nullable=False)

    room = relationship("AiChatRoom", back_populates="messages")


class ProfilePersonalProjects(Base):
    __tablename__ = "profile_personal_projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    github = Column(String, nullable=True)
    demo_link = Column(String, nullable=True)
    project_stack = Column(String, nullable=True)

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user = relationship("Users", back_populates="personal_projects")


class Boards(Base):
    __tablename__ = "board"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user = relationship("Users", back_populates="boards")

class BoardsColumns(Base):
    __tablename__ = "board_column"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, default="New status")
    board_id = Column(UUID(as_uuid=True), ForeignKey("board.id", ondelete="CASCADE"))
    position = Column(Integer, default=0)

    tasks = relationship("BoardTasks", back_populates="column", cascade="all, delete-orphan",order_by="BoardTasks.position")

class BoardTasks(Base):
    __tablename__ = "board_task"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    column_id = Column(UUID(as_uuid=True), ForeignKey("board_column.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    position = Column(Integer, default=0)
    priority = Column(Enum(BoardTaskPriorityType, name="priority"), nullable=False, default=BoardTaskPriorityType.LOW)

    column = relationship("BoardsColumns", back_populates="tasks")

