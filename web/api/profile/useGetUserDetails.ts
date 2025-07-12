import { useQuery } from "@tanstack/react-query"
import { getUserDetails } from "./getUserDetails"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetUserDetails = () => {
  return useQuery({
    queryFn: getUserDetails,
    queryKey: [QueryKeys.USER_DETAILS]
  })
}