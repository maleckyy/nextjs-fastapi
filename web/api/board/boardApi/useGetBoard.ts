import { useQuery } from "@tanstack/react-query"
import { getBoards } from "./getBoards"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetBoard = () => {
  return useQuery({
    queryKey: [QueryKeys.BOARD],
    queryFn: getBoards
  })
}