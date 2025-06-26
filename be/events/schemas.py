from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime

class EventCreate(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str | None = None
    event_date: datetime

class EventResponse(EventCreate):
    id: UUID
    class Config:
        from_attributes = True

class EventOutput(EventResponse):
    user_id: UUID

    class Config:
        from_attributes = True