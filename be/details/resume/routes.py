import datetime
from fastapi import APIRouter, Response
from jinja2 import Environment, FileSystemLoader
from fastapi import APIRouter, Depends
from auth.routes import get_current_user
import models
from dependency import db_dependency

env = Environment(loader=FileSystemLoader("templates"))

router = APIRouter(
    prefix="/details/resume",
    tags=["User Resume"]
)


@router.get("")
def get_resume_html(db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    template = env.get_template("resume.html")
    html = template.render(
        username=current_user.email
    )
    return Response(content=html, media_type="text/html")