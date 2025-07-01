import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({required_error: "Pole jest wymagane"}).min(3, "Email jest za krótki").email("Email jest niepoprawny"),
  password: z.string({required_error: "Pole jest wymagane"}).min(5, "Hasło jest zbyt krótkie"),
});

export type LoginFormType = z.infer<typeof loginSchema>;
