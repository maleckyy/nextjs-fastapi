import { SaveMessagePayload } from "@/types/agentAi/agent.type";
import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";


export async function saveMessage(data: SaveMessagePayload) {

  const messageData = {
    content: data.message.content,
    message_type: data.message.messageType
  }

  const response = await api.post(`${ApiEndpoints.AGENT_AI_CREATE_CHAT}/${data.roomId}`, messageData)
  return response.data
}

