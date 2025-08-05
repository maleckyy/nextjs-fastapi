import { useQuery } from "@tanstack/react-query"
import { getExpensesFromSixMonths } from "./getExpensesFromSixMonths"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetExpensesStats = () => {
  return useQuery({
    queryFn: getExpensesFromSixMonths,
    queryKey: [QueryKeys.EXPENSE_STATS]
  })
}