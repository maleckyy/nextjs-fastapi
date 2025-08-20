import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ required_error: "This field is required" }).min(3, "Email is too short.").email("Email address is incorrect."),
  password: z.string({ required_error: "This field is required" }).min(5, "Password is too short."),
});

export type LoginFormType = z.infer<typeof loginSchema>;
