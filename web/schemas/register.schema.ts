import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({ required_error: "Field is required" }).min(4, "Username is too short"),
  email: z.string({ required_error: "Field is required" }).min(8, "Email is too short").email("Email is incorrect"),
  password: z.string({ required_error: "Field is required" }).min(6, "Password is too short"),
  confirmPassword: z.string({ required_error: 'Field is required' })
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords are not the same',
});