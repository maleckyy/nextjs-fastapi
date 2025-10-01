import { api } from "@/api/axios"
import { ChangeTaskDestinationRequestBodyType } from "@/types/board/board.type"

export async function updateTaskPosition(body: ChangeTaskDestinationRequestBodyType) {
  const res = await api.post(`/board/task/${body.taskId}`, body)
  return res.data
}