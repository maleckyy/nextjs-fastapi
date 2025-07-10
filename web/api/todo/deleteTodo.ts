import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function deleteTodoById(id: string) {
  const response = await api.delete(`${ApiEndpoints.TODO_DELETE}/${id}`)
  return response.data
}