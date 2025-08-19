from datetime import datetime, timedelta, timezone
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, Response
from typing import Annotated
from .schemas import RefreshRequest, Token, TokenData
from dependency import db_dependency
from utils.passwordhashing import verify_password
import jwt
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
import models
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

def get_use_by_id(id:str , db: db_dependency):
    return db.query(models.Users).filter(models.Users.id == id).first()

def get_user_by_email(email:str, db: db_dependency):
    return db.query(models.Users).filter(models.Users.email == email).first()

SECRET_KEY = SECRET_KEY
ALGORITHM = ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = ACCESS_TOKEN_EXPIRE_MINUTES

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='auth/token')

def authenticate_user(email: str, password: str, db: db_dependency):
    user = get_user_by_email(email, db)
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db:db_dependency):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id = payload.get("sub")
        if id is None:
            raise credentials_exception

    except jwt.InvalidTokenError:
        raise credentials_exception

    user = get_use_by_id(id , db)
    if user is None:
        raise credentials_exception
    return user

def create_refresh_token() -> str:
    refresh_token = str(uuid4())
    return refresh_token


@router.post('/token')
async def login_for_access_token(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        db: db_dependency
    ):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    token = Token(access_token=access_token, token_type="bearer")
    token_object = models.UserToken()
    token_object.access_token = token.access_token
    token_object.refresh_token = create_refresh_token()
    token_object.token_expires_time = int(access_token_expires.total_seconds())
    token_object.user_id = user.id
    expire_datetime = datetime.now(timezone.utc) + access_token_expires

    db.query(models.UserToken).filter(models.UserToken.user_id == user.id).delete()
    db.add(token_object)
    db.commit()
    db.refresh(token_object)

    return {
        "access_token" : token.access_token,
        "token_expires_time" : access_token_expires,
        "expire_datetime": expire_datetime,
        "user": token_object,
        "refreshToken": token_object.refresh_token
    }

@router.post('/login')
async def user_login(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        db: db_dependency
    ):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    token = Token(access_token=access_token, token_type="bearer")
    token_object = models.UserToken(
        access_token = token.access_token,
        refresh_token = create_refresh_token(),
        token_expires_time = int(access_token_expires.total_seconds()),
        user_id = user.id
    )

    db.query(models.UserToken).filter(models.UserToken.user_id == user.id).delete()
    db.add(token_object)
    db.commit()
    db.refresh(token_object)

    user_details = db.query(models.UserDetails).filter(models.UserDetails.user_id == user.id).first()

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "image": user_details.photo_path,

        "accessToken": token.access_token,
        "refreshToken": token_object.refresh_token,
        "tokenExpiresTime" : access_token_expires,
    }


@router.post("/refresh")
async def refresh_access_token(
        refreshToken: RefreshRequest,
        db: db_dependency,
    ):
    token_object = db.query(models.UserToken).filter(
        models.UserToken.refresh_token == refreshToken.refresh_token
    ).first()

    if not token_object:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    if (token_object.refresh_token != refreshToken.refresh_token):
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user = db.query(models.Users).filter(models.Users.id == token_object.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=expires
    )

    token_object.access_token = new_access_token
    token_object.token_expires_time = int(expires.total_seconds())
    token_object.refresh_token = create_refresh_token()
    db.commit()
    db.refresh(token_object)

    user_details = db.query(models.UserDetails).filter(models.UserDetails.user_id == user.id).first()

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "image": user_details.photo_path,

        "accessToken": new_access_token,
        "refreshToken" : token_object.refresh_token,
        "tokenExpiresTime": token_object.token_expires_time
    }


@router.delete("/logout")
async def user_logout(response: Response, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    auth_user = db.query(models.UserToken).filter(models.UserToken.user_id == current_user.id).first()
    db.delete(auth_user)
    db.commit()
    response.delete_cookie(key="authjs.session-token")
    return {"message": "wylogowano usera"}
