from fastapi import FastAPI
import models
from database import engine
from users import routes as user_routes
from auth import routes as auth_routes
from todos import routes as todos_routes
from events import routes as events_routes
from details import routes as details_routes
from expenses import routes as expenses_routes
from auth.routes import oauth2_scheme
from fastapi.middleware.cors import CORSMiddleware
from config import origins_raw


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
