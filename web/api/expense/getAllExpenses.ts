import { Expense } from "@/types/expense/expense.type";
import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function getAllExpenses(): Promise<Expense[]> {
  const res = await api.get(ApiEndpoints.EXPENSE)
  return res.data
}