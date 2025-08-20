import { z } from "zod";

export const updateUserAccountSchema = z.object({
  username: z.string().min(4, "Username is too short").optional(),
  email: z
    .string()
    .min(8, "Email is too short")
    .email("Email is incorrect")
    .optional(),
  password: z.string().min(6, "Password is too short").optional(),
  confirmPassword: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.password) {
    if (!data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Password confirmation is required",
        code: z.ZodIssueCode.custom,
      });
    }
    else if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords are not the same",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});