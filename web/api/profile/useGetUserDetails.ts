import { useQuery } from "@tanstack/react-query"
import { getUserDetails } from "./getUserDetails"
import { QueryKeys } from "@/QueryKeys/queryKeys"
import { useAuthStore } from "@/store/authStore"

export const useGetUserDetails = () => {
  const token = useAuthStore(state => state.token)
  return useQuery({
    queryFn: getUserDetails,
    queryKey: [QueryKeys.USER_DETAILS],
    enabled: !!token,
    refetchOnWindowFocus: false
  })
}