import { useMutation } from "@tanstack/react-query"
import { createNewTodo } from "./createTodo"

export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: createNewTodo

  })
}
