import { api } from "@/api/axios"

export type DeleteTaskParams = {
  boardId: string
  columnId: string
  taskId: string
}

export async function deleteTaskById({ boardId, columnId, taskId }: DeleteTaskParams) {
  const res = await api.delete(`/board/${boardId}/column/${columnId}/task/${taskId}`)
  return res.data
}