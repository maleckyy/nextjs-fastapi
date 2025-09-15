import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { TaskCreateRequest } from "@/types/board/board.type";

export async function addNewTask(newTask: TaskCreateRequest) {
  const res = await api.post(`${ApiEndpoints.BOARD}/${newTask.boardId}/column/${newTask.columnId}`, newTask.taskData)
  return res.data
}