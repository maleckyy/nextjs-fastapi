import { useMutation } from "@tanstack/react-query"
import { saveMessage } from "./saveMessage"

export const useSaveMessage = () => {
  return useMutation({
    mutationFn: saveMessage
  })
}