from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID

class ProjectCreate(BaseModel):
    title: str
    description : Optional[str] = None
    github : Optional[str] = None
    demo_link : Optional[str] = Field(None, alias="demoLink")
    project_stack: str = Field(alias="projectStack")

    class Config:
        populate_by_name = True

class ProjectOutput(ProjectCreate):
    id: UUID