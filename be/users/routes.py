from fastapi import APIRouter, Depends, HTTPException
from auth.routes import get_current_user
from .schemas import UserCreate, User
import models
from dependency import db_dependency
from utils.passwordhashing import hash_password

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.post('/create', response_model=User)
async def create_new_user(db: db_dependency, user: UserCreate):

    existing_user = db.query(models.Users).filter(models.Users.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="This email is already in use")

    existing_username = db.query(models.Users).filter(models.Users.username == user.username).first()
    if existing_username:
        raise HTTPException(status_code=409, detail="This username is already in use")

    hashed_pw = hash_password(user.password)
    new_user = models.Users(
        username=user.username,
        email=user.email,
        password_hash=hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get('/', response_model=list[User], dependencies=[Depends(get_current_user)])
async def get_all_users(db:db_dependency):
    return db.query(models.Users).all()


@router.get('/active', response_model=User, dependencies=[Depends(get_current_user)])
async def get_user(current_user: models.Users = Depends(get_current_user)):
    return current_user


@router.delete('/delete', dependencies=[Depends(get_current_user)])
async def delete_user_by_id(db:db_dependency, current_user: models.Users = Depends(get_current_user)):
    user = current_user

    db.delete(user)
    db.commit()
    return f"Usunięto usera o id {user.id}"


@router.put('/update', dependencies=[Depends(get_current_user)])
async def update_user_by_id(db:db_dependency, user:UserCreate, current_user: models.Users = Depends(get_current_user)):

    # dodac jeszcze pozniej weryfikacje dlugosci znakow dla hasla i nazwyuzytownika i czy email to email
    email_exists = db.query(models.Users).filter(
        models.Users.email == user.email,
        models.Users.id != current_user.id
    ).first()
    if email_exists:
        raise HTTPException(status_code=409, detail="Email already in use")

    username_exists = db.query(models.Users).filter(
        models.Users.username == user.username,
        models.Users.id != current_user.id
    ).first()
    if username_exists:
        raise HTTPException(status_code=409, detail="Username already in use")

    hashed_new_pw = hash_password(user.password)

    current_user.username = user.username
    current_user.email = user.email
    current_user.password_hash = hashed_new_pw

    db.commit()
    db.refresh(current_user)
    return current_user