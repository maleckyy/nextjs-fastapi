from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime

class TodoCreate(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str | None = None

class TodoUpdate(TodoCreate):
    is_done: bool

    class Config:
        from_attributes = True

class TodoResponse(TodoCreate):
    id: UUID
    is_done: bool
    created_at: datetime

    class Config:
        from_attributes = True

class TodoOutput(TodoResponse):
    user_id: UUID

    class Config:
        from_attributes = True