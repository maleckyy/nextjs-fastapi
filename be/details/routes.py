from fastapi import APIRouter, Depends, HTTPException
from .schemas import UserDetails, UserContent
from dependency import db_dependency
import models
from fastapi import APIRouter, Depends
from auth.routes import get_current_user
from dependency import db_dependency



router = APIRouter(
    prefix="/details",
    tags=["Details"],
    dependencies=[Depends(get_current_user)]
)

@router.get('', response_model=UserDetails)
async def get_user_details(db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    return db.query(models.UserDetails).filter(models.UserDetails.user_id == current_user.id).first()

@router.put('', response_model=UserDetails)
async def update_user_details(db: db_dependency, newData: UserContent, current_user: models.Users = Depends(get_current_user)):
    detail_to_update = db.query(models.UserDetails).filter(models.UserDetails.user_id == current_user.id).first()

    if not detail_to_update:
        raise HTTPException(status_code=404, detail="Details not found")

    if not detail_to_update.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    for key,value in newData.model_dump().items():
        setattr(detail_to_update, key, value)
    db.commit()
    db.refresh(detail_to_update)
    return detail_to_update