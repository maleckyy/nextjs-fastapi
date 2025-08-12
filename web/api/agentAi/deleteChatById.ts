import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function deleteChatById(roomId: string) {
  const res = await api.delete(ApiEndpoints.AGENT_AI_CREATE_CHAT + "/" + roomId)
  return res.data
}