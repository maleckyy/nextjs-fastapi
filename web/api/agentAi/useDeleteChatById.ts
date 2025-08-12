import { useMutation } from "@tanstack/react-query"
import { deleteChatById } from "./deleteChatById"

export const useDeleteChatById = () => {
  return useMutation({
    mutationFn: deleteChatById
  })
}