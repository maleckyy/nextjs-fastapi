
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from auth.routes import get_current_user
from details.schemas import UserDetailsOutput
import models
from dependency import db_dependency
from details import routes as details_routes


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/room")
def get_or_create_room(
    target_user_id: str,
    db: db_dependency,
    current_user: models.Users = Depends(get_current_user)
):

    existing_room = (
        db.query(models.ChatRoom)
        .join(models.chat_participants)
        .filter(models.chat_participants.c.user_id == current_user.id)
        .join(models.ChatRoom.participants)
        .filter(models.Users.id == target_user_id)
        .first()
    )

    if target_user_id == current_user.id:
       raise HTTPException(status_code=400)

    if existing_room:
        return {"room_id": existing_room.id}

    new_room = models.ChatRoom()
    new_room.participants = [current_user, db.query(models.Users).get(target_user_id)]

    db.add(new_room)
    db.commit()
    db.refresh(new_room)

    return {"room_id": new_room.id}


def format_message(message: models.ChatMessage, user: models.Users):
    return {
        "client": {
            "username": user.username,
            "avatarUrl": user.details.photo_path,
            "user_id": str(user.id)
        },
        "message": message.content,
    }

@router.get("/messages/{room_id}")
async def get_last_messages(room_id: str ,db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    room = db.query(models.ChatRoom).filter(models.ChatRoom.id == room_id).first()

    if current_user.id not in [participant.id for participant in room.participants]:
        raise HTTPException(401)

    messages = db.query(models.ChatMessage).filter(models.ChatMessage.room_id == room_id).order_by(models.ChatMessage.timestamp).all()

    response = []
    for msg in messages:
        user = msg.sender
        response.append({
            "client": {
                "username": user.username,
                "avatarUrl": user.details.photo_path if user.details else None,
                "user_id": str(user.id)
            },
            "message": msg.content
        })

    return response


class ConnectionManager:
    def __init__(self):
        self.rooms: dict[str, list[WebSocket]] = {}

    async def connect(self, room_id: str, websocket: WebSocket):
        await websocket.accept()
        if room_id not in self.rooms:
            self.rooms[room_id] = []
        self.rooms[room_id].append(websocket)

    def disconnect(self, room_id: str, websocket: WebSocket):
        if room_id in self.rooms and websocket in self.rooms[room_id]:
            self.rooms[room_id].remove(websocket)


    async def broadcast(self, room_id: str, message: dict):
        to_remove = []
        if room_id in self.rooms:
            for connection in self.rooms[room_id]:
                try:
                    await connection.send_json(message)
                except RuntimeError as e:
                    if "websocket.send" in str(e):
                        to_remove.append(connection)
                    else:
                        raise
                except Exception:
                    to_remove.append(connection)
            for connection in to_remove:
                self.rooms[room_id].remove(connection)


manager = ConnectionManager()


@router.websocket("")
async def websocket_endpoint(websocket: WebSocket, room_id: str, client_id: str, token: str, db: db_dependency):

    user_id_by_token = db.query(models.UserToken).filter(models.UserToken.access_token == token).first()
    if not user_id_by_token:
        await websocket.close(code=1008)
        return    

    if not user_id_by_token.user_id != client_id:
        await websocket.close(code=1008)
        return    

    user = details_routes.get_user_details_by_id(db, user_id_by_token.user_id)
    room = db.query(models.ChatRoom).filter(models.ChatRoom.id == room_id).first()

    if not user or not room or user not in room.participants:
        await websocket.close(code=1008)
        return
    
    await manager.connect(room_id, websocket)

    try:
        while True:
            data = await websocket.receive_text()

            new_message = models.ChatMessage(
                room_id=room.id,
                sender_id=user.id,
                content=data
            )
            db.add(new_message)
            db.commit()
            db.refresh(new_message)


            await manager.broadcast(room_id, {
                "client" : {
                    "username": user.username,
                    "avatarUrl": user.details.photo_path,
                    "user_id": str(user.id)
                },
                "message": data
            })
    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
