from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    username: str = Field(min_length=4)
    email: EmailStr = Field(min_length=8)

class UserCreate(UserBase):
    password: str = Field(min_length=6)

class UpdateUser(BaseModel):
    username: Optional[str] = Field(None, min_length=4)
    email: Optional[EmailStr] = Field(None, min_length=8)
    password: Optional[str] = Field(None, min_length=6)

class User(UserBase):
    id: UUID
    created_at: datetime
    class config:
        from_atttibute: True