import { Todo } from "@/types/todo/todo.type"
import { api } from "../axios"

export async function getLastTodo():Promise<Todo[]> {
  const response = await api.get('/todo/');
  return response.data;
}