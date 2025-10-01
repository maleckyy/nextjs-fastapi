import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { Task } from "@/types/board/board.type";

export async function getBoardTask(taskId: string): Promise<Task> {
  const res = await api.get<Task>(ApiEndpoints.BOARD_TASK + "/" + taskId)
  return res.data
}