import { AgentAiQuestion, AiMessage, AskAiPayload } from "@/types/agentAi/agent.type"
import { api } from "../axios"

export async function sendMessageToAi(payload: AskAiPayload): Promise<AiMessage> {
  const data: AgentAiQuestion = { question: payload.question }
  const response = await api.post("/agent-ai/ask/" + payload.roomId, data)
  return response.data
}