import { ExpenseStats } from "@/types/expense/expense.type"
import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function getExpensesFromSixMonths(): Promise<ExpenseStats[]> {
  const response = await api.get(ApiEndpoints.EXPENSE_STATS)
  return response.data
}
