import { useQuery } from "@tanstack/react-query"
import { getUserDetails } from "./getUserDetails"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetUserDetails = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  return useQuery({
    queryFn: getUserDetails,
    queryKey: [QueryKeys.USER_DETAILS],
    enabled: !!token
  })
}