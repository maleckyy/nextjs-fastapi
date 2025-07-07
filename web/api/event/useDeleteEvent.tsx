import { useMutation } from "@tanstack/react-query"
import { deleteEventById } from "./deleteEventById"

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: deleteEventById
  })
}