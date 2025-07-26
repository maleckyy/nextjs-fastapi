from fastapi import APIRouter, HTTPException, Response
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

    profile_details = db.query(models.UserDetails).filter(models.UserDetails.user_id == current_user.id).first()
    
    if not profile_details:
        raise HTTPException(status_code=404, detail="User profile not found")

    profile_stack = db.query(models.UserProfileStack).filter(models.UserProfileStack.user_id == current_user.id).first()
    formatted_stack = profile_stack.stack.replace(",", ", ")


    print(profile_details)


    template = env.get_template("resume.html")
    html = template.render(
        first_name=profile_details.first_name,
        last_name=profile_details.last_name,
        description=profile_details.description,
        profile_stack=formatted_stack,
        email= current_user.email,
        phone_number= profile_details.phone_number,
    )
    return Response(content=html, media_type="text/html")