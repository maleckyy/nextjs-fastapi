import { useMutation } from "@tanstack/react-query"
import { deleteTodoById } from "./deleteTodo"

export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: deleteTodoById
  })
}