from pydantic import BaseModel
from uuid import UUID

class UserContent(BaseModel):
    description: str
    phone_number: str
    address: str
    country: str

class UserDetails(UserContent):
    user_id: UUID