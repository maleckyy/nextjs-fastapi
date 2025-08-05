import { useMutation } from "@tanstack/react-query"
import { sendMessageToAi } from "./sendQuestionToAi"

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessageToAi
  })
}