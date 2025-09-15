import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";

export async function getBoardTask(taskId: string) {
  const res = await api.get(ApiEndpoints.BOARD_TASK + "/" + taskId)
  return res.data
}