import z from "zod";

export const updateUserStackSchema = z.object({
  stack: z.string(),
});