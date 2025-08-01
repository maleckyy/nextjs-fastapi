from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from details.schemas import UserDetailsOutput
import models
from database import engine
from users import routes as user_routes
from auth import routes as auth_routes
from todos import routes as todos_routes
from events import routes as events_routes
from details import routes as details_routes
from expenses import routes as expenses_routes
from details.resume import routes as user_resume_routes
from details.profileStack import routes as user_stack_routes
from details.experience import routes as user_experience_routes
from uploads.endpoint import routes as avatar_routes
from auth.routes import oauth2_scheme
from fastapi.middleware.cors import CORSMiddleware
from config import origins_raw
from dependency import db_dependency
from sqlalchemy.orm import Session

app = FastAPI();
oauth2_scheme = oauth2_scheme

origins = [origin.strip() for origin in origins_raw.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"Hello": "World"}

models.Base.metadata.create_all(bind=engine)

app.include_router(auth_routes.router)

app.include_router(user_routes.router)

app.include_router(todos_routes.router)

app.include_router(events_routes.router)

app.include_router(details_routes.router)

app.include_router(expenses_routes.router)

app.include_router(user_resume_routes.router)

app.include_router(user_stack_routes.router)

app.include_router(user_experience_routes.router)

app.include_router(avatar_routes.router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
    
    async def send_personal_message(self, message: dict, websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast(self, message: dict):
        to_remove = []
        for connection in self.active_connections:
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
            self.active_connections.remove(connection)


manager = ConnectionManager()

@app.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket, client_id: str, db: db_dependency):
    await manager.connect(websocket)
    user = details_routes.get_user_details_by_id(db, client_id)

    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast({
                "client" : {
                    "username": user.username,
                    "avatarUrl": user.details.photo_path,
                    "user_id": str(user.id)
                },
                "message": data
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({
            "client" : {
                "username": user.username,
                "avatarUrl": user.details.photo_path,
                "user_id": str(user.id)
            },
            "message": "left the chat"
        })
