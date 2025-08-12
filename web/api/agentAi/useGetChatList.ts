import { QueryKeys } from "@/QueryKeys/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { getUserChatList } from "./getChatList"

export const useGetChatList = () => {
  return useQuery({
    queryKey: [QueryKeys.AI_CHATS],
    queryFn: getUserChatList,
    retry: false
  })

}