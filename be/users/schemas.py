from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(min_length=6)

class User(UserBase):
    id: UUID
    created_at: datetime
    class config:
        from_atttibute: True

