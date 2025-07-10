import { useQuery } from "@tanstack/react-query"
import { getTodo } from "./getTodo"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetTodo = () => {
  return useQuery({
    queryKey: [QueryKeys.TODOS],
    queryFn: getTodo,
    retryOnMount: false,
    staleTime: 60 * 1000,
    select: (data) =>
      [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
  })
}