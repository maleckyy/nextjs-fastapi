import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";
import { ExpenseFormType } from "@/schemas/expense.schema";

export async function updateExpense(updateData: { data: ExpenseFormType, id: string }) {
  const response = await api.put(`${ApiEndpoints.EXPENSE}/${updateData.id}`, updateData.data)
  return response.data
}