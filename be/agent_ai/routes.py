from anthropic import BaseModel
from fastapi import APIRouter
from pydantic import BaseModel
from pydantic import BaseModel
from agent_ai.ollama_provider import OllamaProvider

router = APIRouter(
    prefix="/agent-ai",
    tags=["Agent AI"]
)

class Input(BaseModel):
    question: str

class Output(BaseModel):
    answer: str

provider = OllamaProvider()

@router.post("/ask", response_model=Output)
def ask_question(input: Input):
    answer = provider.complete(input.question)
    return {"answer": answer}