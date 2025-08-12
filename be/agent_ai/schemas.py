from pydantic import BaseModel, Field
from uuid import UUID

from enums.ai_chat_message_type import MessageType

class MessageCreate(BaseModel):
    content: str
    message_type: MessageType = Field(..., alias="messageType")

    class Config:
        validate_by_name = True
        from_attributes = True

class MessageOutput(MessageCreate):
    class Config:
       from_attributes = True


class ChatRoomOutput(BaseModel):
    id: UUID
    name: str
