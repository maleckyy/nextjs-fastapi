import { ExpenseType } from "@/types/expense/expense.type";

export function getExpenseType(value: number): ExpenseType {
  switch (value) {
    case 0:
      return ExpenseType.WYDATEK;
    case 1:
      return ExpenseType.PRZYCHOD;
    default:
      throw new Error("Nieznany typ wydatku");
  }
}