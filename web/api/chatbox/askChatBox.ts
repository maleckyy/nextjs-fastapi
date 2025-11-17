import { api } from "../axios"

export async function askChatBox(question: string) {
  const res = await api.post("/agent-ai/help", { question: question })
  return res.data
}
