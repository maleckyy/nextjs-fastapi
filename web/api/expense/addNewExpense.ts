import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";
import { ExpenseFormType } from "@/schemas/expense.schema";

export async function addNewExpense(data: ExpenseFormType) {
  const response = await api.post(ApiEndpoints.EXPENSE, data)
  return response.data
}