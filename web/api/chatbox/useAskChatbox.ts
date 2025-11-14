import { useMutation } from "@tanstack/react-query"
import { askChatBox } from "./askChatBox"

export const useAskChatBox = () => {
  return useMutation({
    mutationFn: askChatBox
  })
}