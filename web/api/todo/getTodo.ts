import { Todo } from "@/types/todo/todo.type"
import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function getTodo() {
  const res = await api.get<Todo[]>(ApiEndpoints.TODO_ALL)
  return res.data
}