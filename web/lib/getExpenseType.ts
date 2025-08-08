import { ExpenseType } from "@/types/expense/expense.type";

export function getExpenseType(value: number): ExpenseType {
  switch (value) {
    case 0:
      return ExpenseType.EXPENSE;
    case 1:
      return ExpenseType.REVENUE;
    default:
      throw new Error("Nieznany typ wydatku");
  }
}