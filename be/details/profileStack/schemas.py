from pydantic import BaseModel

class Stack(BaseModel):
    stack: str

class StackOutput(Stack):
    user_id: str