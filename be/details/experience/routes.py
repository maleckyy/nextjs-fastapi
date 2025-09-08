from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import nulls_last
from .schemas import ExperienceCreate, ExperienceOut, ExperienceUpdate
from dependency import db_dependency
import models
from auth.routes import get_current_user


router = APIRouter(
    prefix="/details/experience",
    tags=["Profile Experience"],
    dependencies=[Depends(get_current_user)]
)

@router.get('', response_model=list[ExperienceOut])
async def get_profile_experience(db: db_dependency, current_user: models.Users = Depends(get_current_user)):
        return (
        db.query(models.UserProfileExperience)
        .filter(models.UserProfileExperience.user_id == current_user.id)
        .order_by(nulls_last(models.UserProfileExperience.ending_date.asc()))
        .all()
    )

@router.post('')
async def add_profile_experience(db: db_dependency, experience_data: ExperienceCreate, current_user: models.Users = Depends(get_current_user)):
    new_experience = models.UserProfileExperience(**experience_data.model_dump(), user_id = current_user.id)
    db.add(new_experience)
    db.commit()
    db.refresh(new_experience)
    return new_experience

@router.put('/{experience_id}')
async def update_profile_experience_by_id(db: db_dependency, experience_id: str, new_experience_data: ExperienceUpdate, current_user: models.Users = Depends(get_current_user)):
    experience_to_update = db.query(models.UserProfileExperience).filter(models.UserProfileExperience.id == experience_id).first()

    if not experience_to_update:
        raise HTTPException(status_code=404, detail="Experience not found")

    if not experience_to_update.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    for key,value in new_experience_data.model_dump().items():
        setattr(experience_to_update, key, value)

    db.commit()
    db.refresh(experience_to_update)
    return experience_to_update

@router.delete('/{experience_id}')
async def delete_profile_experience_by_id(db: db_dependency, experience_id: str, current_user: models.Users = Depends(get_current_user)):
    experience_to_delete = db.query(models.UserProfileExperience).filter(models.UserProfileExperience.id == experience_id).first()

    if not experience_to_delete:
        raise HTTPException(status_code=404, detail="Experience not found")

    if not experience_to_delete.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    db.delete(experience_to_delete)
    db.commit()
    return "Usunięto"