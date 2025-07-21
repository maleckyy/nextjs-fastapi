import { api } from "@/api/axios"
import { ApiEndpoints } from "@/api/routes/apiEndpoints"

export async function getExpenseSummary() {
  const response = await api.get(ApiEndpoints.EXPENSE_SUMMARY)
  return response.data
}