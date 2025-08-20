import { z } from 'zod';

export const expenseSchema = z.object({
  title: z.string({ message: "Field is required" }).min(3, { message: "Title is too short" }),
  description: z.string().optional(),
  expense_date: z.date(),
  expense_type: z.union([z.literal(0), z.literal(1)]),
  amount: z.coerce.number().nonnegative(),
});

export type ExpenseFormType = z.infer<typeof expenseSchema>;