import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function deleteExpense(expenseId: string) {
  const response = await api.delete(ApiEndpoints.EXPENSE_DELETE + `/${expenseId}`)
  return response.data
}