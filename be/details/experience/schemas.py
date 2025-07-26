from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class ExperienceBase(BaseModel):
    position: str
    description: Optional[str] = None
    starting_date: datetime
    ending_date: Optional[datetime] = None

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(BaseModel):
    position: Optional[str] = None
    description: Optional[str] = None
    starting_date: Optional[datetime] = None
    ending_date: Optional[datetime] = None

class ExperienceOut(ExperienceBase):
    id: UUID