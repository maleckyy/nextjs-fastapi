export enum ExpenseType {
  EXPENSE = "Expense",
  REVENUE = "Revenue",
}

export type ExpenseSummary = {
  total_income: number;
  total_expense: number;
  balance: number;
  month: string;
  year: string;
};

export type ExpenseCreate = {
  title: string;
  description: string;
  expense_date: string;
  expense_type: 0 | 1;
  amount: string;
}

export type Expense = ExpenseCreate & {
  id: string;
};

export type ExpenseStats = {
  month: number,
  income: number,
  expense: number
}