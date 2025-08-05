import { AgentAiAnwser, AgentAiQuestion } from "@/types/agentAi/agent.type"
import { api } from "../axios"

export async function sendMessageToAi(message: AgentAiQuestion): Promise<AgentAiAnwser> {
  const data: AgentAiQuestion = message

  const response = await api.post("/agent-ai/ask", data)
  return response.data
}