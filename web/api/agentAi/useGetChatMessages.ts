import { useQuery } from "@tanstack/react-query"
import { getChatMessages } from "./getChatMessages"
import { ChatRoomOutput } from "@/types/agentAi/agent.type"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetChatMessages = (activeChat: ChatRoomOutput | undefined) => {
  return useQuery({
    queryKey: [QueryKeys.AI_CHAT_HISTORY, activeChat?.id],
    queryFn: () => getChatMessages(activeChat!.id),
    enabled: !!activeChat,
    retry: false
  })
}