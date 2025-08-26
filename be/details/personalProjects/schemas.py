from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class ProjectCreate(BaseModel):
    title: str
    description : Optional[str] = None
    github : Optional[str] = None
    demo_linki : Optional[str] = None
    project_Stack: str

class ProjectOutput(ProjectCreate):
    id: UUID