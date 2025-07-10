import { TodoUpdate } from "@/types/todo/todo.type";
import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function updateTodo(item: TodoUpdate) {
  const response = await api.put(`${ApiEndpoints.TODO_UPDATE}/${item.id}`, item.newTodo)
  return response.data
}