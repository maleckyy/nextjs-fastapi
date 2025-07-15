from pydantic import BaseModel
from uuid import UUID

from users.schemas import User

class UserContent(BaseModel):
    description: str
    phone_number: str
    address: str
    country: str

class UserDetails(UserContent):
    user_id: UUID

class UserDetailsOutput(User):
    details: UserContent