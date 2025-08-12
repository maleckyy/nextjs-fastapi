from anthropic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from pydantic import BaseModel
from agent_ai.ollama_provider import OllamaProvider
from auth.routes import get_current_user
from agent_ai.schemas import ChatRoomOutput, MessageCreate, MessageOutput
import models
from dependency import db_dependency
from enums.ai_chat_message_type import MessageType

router = APIRouter(
    prefix="/agent-ai",
    tags=["Agent AI"],
    dependencies=[Depends(get_current_user)]
)

class Input(BaseModel):
    question: str

class Output(BaseModel):
    answer: str

provider = OllamaProvider()

def get_chat_history(chat_id, db, limit=10):
    messages = (
        db.query(models.AiChatMessage)
        .filter(models.AiChatMessage.room_id == chat_id)
        .order_by(models.AiChatMessage.timestamp.asc())
        .limit(limit)
        .all()
    )
    messages.reverse()
    return [
        {"role": "user" if m.message_type == MessageType(1) else "assistant", "content": m.content}
        for m in messages
    ]

def build_prompt(chat_id, new_question, db):
    messages = get_chat_history(chat_id, db, limit=10)

    history_text = "Here is our conversation so far:\n"
    for msg in messages:
        if msg["role"] == "user":
            history_text += f"User: {msg['content']}\n"
        else:
            history_text += f"Assistant : {msg['content']}\n"

    history_text += f"User: {new_question}\Assistant :"
    return history_text

def create_chat_message(chat_id: str, message_data: MessageCreate ,db:db_dependency, current_user: models.Users = Depends(get_current_user)):
    room_exists = (
        db.query(models.AiChatRoom)
        .filter(
            models.AiChatRoom.id == chat_id,
            models.AiChatRoom.user_id == current_user.id
        )
        .first()
    )

    if not room_exists:
        raise HTTPException(status_code=404, detail="Chat not found or unauthorized")
    
    if room_exists.name == "New chat" and message_data.content:
        room_exists.name = message_data.content[:35]
    
    new_message = models.AiChatMessage(
        room_id=chat_id,
        content=message_data.content,
        message_type=message_data.message_type
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message

@router.post("/ask/{chat_id}", response_model=MessageOutput)
async def ask_question(chat_id: str, db:db_dependency,input: Input, current_user: models.Users = Depends(get_current_user)):

    question_message_data = MessageCreate(
        content=input.question,
        message_type = MessageType(1)
    )

    create_chat_message(chat_id, question_message_data, db, current_user)

    prompt = build_prompt(chat_id, input.question, db)
    answer = provider.complete(prompt)

    answer_message_data =  MessageCreate(
        content = answer,
        message_type = MessageType(0)
    )
    answer_response =  create_chat_message(chat_id, answer_message_data, db, current_user)

    return answer_response

@router.post("/chat")
async def create_new_chat(db:db_dependency, current_user: models.Users = Depends(get_current_user)):
    new_room = models.AiChatRoom(
        user_id = current_user.id,
        name = "New chat"
    )

    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room

@router.get("/chat", response_model=list[ChatRoomOutput])
async def get_all_user_chats(db:db_dependency, current_user: models.Users = Depends(get_current_user)):

    chats = db.query(models.AiChatRoom).filter(models.AiChatRoom.user_id == current_user.id).all()

    if not chats:
        raise HTTPException(status_code=404, detail="Chat not found or unauthorized")
    
    return chats
    
@router.get("/chat/{chat_id}", response_model=list[MessageOutput])
async def get_user_chat_history(chat_id: str, db:db_dependency, current_user: models.Users = Depends(get_current_user)):
    messages = (
        db.query(models.AiChatMessage)
        .join(models.AiChatRoom, models.AiChatMessage.room_id == models.AiChatRoom.id)
        .filter(
            models.AiChatRoom.id == chat_id,
            models.AiChatRoom.user_id == current_user.id
        )
        .order_by(models.AiChatMessage.timestamp.asc())
        .all()
    )

    if not messages:  
        raise HTTPException(status_code=404, detail="Chat not found or unauthorized")

    return messages

@router.delete("/chat/{chat_id}")
async def delete_chat_by_id(chat_id: str, db:db_dependency, current_user: models.Users = Depends(get_current_user)):
    chat = db.query(models.AiChatRoom).filter(
        models.AiChatRoom.id == chat_id,
        models.AiChatRoom.user_id == current_user.id
    ).first()

    if not chat:  
        raise HTTPException(status_code=404, detail="Chat not found or unauthorized")

    db.delete(chat)
    db.commit()
    return "Chat deleted"