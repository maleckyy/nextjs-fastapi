import { useQuery } from "@tanstack/react-query"
import { getAllExpenses } from "./getAllExpenses"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetAllExpenses = () => {
  return useQuery({
    queryFn: getAllExpenses,
    queryKey: [QueryKeys.EXPENSE]
  })
}