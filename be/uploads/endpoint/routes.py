import os, shutil
from uuid import uuid4
from fastapi import APIRouter, UploadFile, File, Depends
import models
from dependency import db_dependency
from auth.routes import get_current_user


router = APIRouter(prefix="/upload-avatar", tags=["Profile Avatar"], dependencies=[Depends(get_current_user)])
UPLOAD_DIR = "uploads/images"

@router.post("")
async def upload_profile_photo(
    db: db_dependency, file: UploadFile = File(...),
    current_user: models.Users = Depends(get_current_user)
):
    user_id = str(current_user.id)
    ext = file.filename.split('.')[-1]
    filename = f"{user_id}.{ext}"
    full_path = os.path.join(UPLOAD_DIR, filename)

    for f in os.listdir(UPLOAD_DIR):
        if f.startswith(f"{user_id}.") and f != filename:
            os.remove(os.path.join(UPLOAD_DIR, f))

    with open(full_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    relative_path = f"{UPLOAD_DIR}/{filename}"
    user_details = db.query(models.UserDetails).filter(models.UserDetails.user_id == current_user.id).first()
    user_details.photo_path = relative_path
    db.commit()

    return {"photo_url": f"/{relative_path}"}
