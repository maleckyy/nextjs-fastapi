import { useMutation } from "@tanstack/react-query"
import { deleteTaskById } from "./deleteTaskById"

export const useDeleteTaskById = () => {
  return useMutation({
    mutationFn: deleteTaskById
  })
}