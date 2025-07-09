import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({required_error: "Pole jest wymagane"}).min(4, "Nazwa użytkownika jest za którka"),
    email: z.string({required_error: "Pole jest wymagane"}).min(8, "Email jest za krótki").email("Email jest niepoprawny"),
    password: z.string({required_error: "Pole jest wymagane"}).min(6, "Hasło jest za krótkie"),
    confirmPassword: z.string({ required_error: 'Pole jest wymagane' })
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Hasła nie są takie same',
  });