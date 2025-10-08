from typing import List, Optional
from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime

from enums.board_task_priority import BoardTaskPriorityType


class ChangeTaskPositionRequestBody(BaseModel):
    task_id: str = Field(alias="taskId")
    source_column_id: str = Field(alias="sourceColumnId")
    destination_column_id: str = Field(alias="destinationColumnId")
    new_task_position: int = Field(alias="newTaskPosition")

    class Config:
        from_attributes = True
        populate_by_name = True


class BoardTaskCreate(BaseModel):
    title: str
    position : Optional[int] = 0

class TaskUpdate(BaseModel):
    title: str
    description: Optional[str]
    priority: BoardTaskPriorityType

class BoardTask(BaseModel):
    title : str
    description : Optional[str]
    createdAt: datetime = Field(alias="created_at")
    position : int
    priority : BoardTaskPriorityType

class BoardTaskOutput(BoardTask):
    id: UUID
    columnId: UUID = Field(alias="column_id")

    class Config:
        from_attributes = True
        populate_by_name = True

# 

class Board(BaseModel):
    name: str

class BoardCreate(Board):
    user_id: UUID

    class Config:
        from_attributes = True
        populate_by_name = True

class BoardOutput(Board):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# 

class BoardColumn(BaseModel):
    name : str
    board_id : UUID
    position : int

class BoardColumnCreate(BoardColumn):
    class Config:
        from_attributes = True

class BoardColumnOutput(BoardColumn):
    id : UUID    
    tasks : List[BoardTaskOutput] = []
    
    class Config:
        from_attributes = True
        populate_by_name = True

class BoardColumnsUpdate(BaseModel):
    id: str
    position: int
