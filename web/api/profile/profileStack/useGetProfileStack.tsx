import { useQuery } from "@tanstack/react-query"
import { getProfileStack } from "./getProfileStack"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetProfileStackQuery = () => {
  return useQuery({
    queryFn: getProfileStack,
    queryKey: [QueryKeys.PROFILE_STACK],
    retry: false,
  })
}