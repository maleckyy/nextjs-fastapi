import { z } from "zod";

export const updateUserAccountSchema = z.object({
  username: z.string().min(4, "Nazwa użytkownika jest za krótka").optional(),
  email: z
    .string()
    .min(8, "Email jest za krótki")
    .email("Email jest niepoprawny")
    .optional(),
  password: z.string().min(6, "Hasło jest za krótkie").optional(),
  confirmPassword: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.password) {
    if (!data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Potwierdzenie hasła jest wymagane",
        code: z.ZodIssueCode.custom,
      });
    }
    else if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Hasła nie są takie same",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});