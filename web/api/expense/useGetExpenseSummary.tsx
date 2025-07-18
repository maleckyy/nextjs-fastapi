import { QueryKeys } from "@/QueryKeys/queryKeys"
import { ExpenseSummary } from "@/types/expense/expense.type"
import { useQuery } from "@tanstack/react-query"
import { getExpenseSummary } from "./getExpenseSummary"

export const useGetExpenseSummary = () => {
  return useQuery<ExpenseSummary>({
    queryKey: [QueryKeys.EXPENSE_SUMMARY],
    queryFn: getExpenseSummary,
  })
}