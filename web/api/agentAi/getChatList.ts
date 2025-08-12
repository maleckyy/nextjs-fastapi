import { ChatRoomOutput } from "@/types/agentAi/agent.type"
import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function getUserChatList(): Promise<ChatRoomOutput[]> {
  const response = await api.get(ApiEndpoints.AGENT_AI_CREATE_CHAT)
  return response.data
}
