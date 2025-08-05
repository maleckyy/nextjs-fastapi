import { UserDetailsOutput } from "@/types/profile/profile.type"
import { useQuery } from "@tanstack/react-query"
import { getUserById } from "./getUserById"

export const useGetUserById = (clientTargetId?: string) => {
  return useQuery<UserDetailsOutput>({
    queryKey: ['chat-room-client-details', clientTargetId],
    queryFn: () => getUserById(clientTargetId!),
    enabled: !!clientTargetId
  })
}

