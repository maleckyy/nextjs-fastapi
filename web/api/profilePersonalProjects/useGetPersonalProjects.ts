import { QueryKeys } from "@/QueryKeys/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { getProfilePersonalProjects } from "./getProfilePersonalProjects"

export const useGetPersonalProject = () => {
  return useQuery({
    queryKey: [QueryKeys.PROFILE_PERSONAL_PROJECTS],
    queryFn: getProfilePersonalProjects
  })
}