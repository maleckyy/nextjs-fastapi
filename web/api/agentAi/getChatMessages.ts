import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function getChatMessages(roomId: string) {
  const res = await api.get(ApiEndpoints.AGENT_AI_CREATE_CHAT + "/" + roomId)
  return res.data
}