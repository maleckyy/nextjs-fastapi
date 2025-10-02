import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { Task } from "@/types/board/board.type";

export type GetTaskRequest = {
  taskId: string,
  boardId: string
}
export async function getBoardTask({ taskId, boardId }: GetTaskRequest): Promise<Task> {
  const res = await api.get<Task>(ApiEndpoints.BOARD + "/" + boardId + "/task/" + taskId)
  return res.data
}