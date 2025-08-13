from pydantic import BaseModel


class CreateUserRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: str | None = None

class RefreshRequest(BaseModel):
    refresh_token: str