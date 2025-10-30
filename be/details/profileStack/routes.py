from fastapi import APIRouter, Depends, HTTPException
from .schemas import Stack
from dependency import db_dependency
import models
from fastapi import APIRouter, Depends
from auth.routes import get_current_user
from dependency import db_dependency


router = APIRouter(
    prefix="/details/stack",
    tags=["Profile Stack"],
    dependencies=[Depends(get_current_user)]
)

@router.get('', response_model=Stack)
async def get_profile_stack(db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    user_stack = db.query(models.UserProfileStack).filter(models.UserProfileStack.user_id == current_user.id).first()

    if not user_stack:
        create_stack = models.UserProfileStack(
            stack="",
            user_id=current_user.id
        )
        db.add(create_stack)
        db.commit()
        db.refresh(create_stack)
        return create_stack

    return user_stack

@router.put('')
async def update_profile_stack(db: db_dependency, stackObject: Stack, current_user: models.Users = Depends(get_current_user)):
    existing_stack = db.query(models.UserProfileStack).filter(models.UserProfileStack.user_id == current_user.id).first()

    if existing_stack:
        existing_stack.stack = stackObject.stack
    else:
        new_stack = models.UserProfileStack(user_id=current_user.id, stack=stackObject.stack)
        db.add(new_stack)
    db.commit()
    
    return {"message": "Stack zapisany"}