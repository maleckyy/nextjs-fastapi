import z from "zod";

export const updateUserDetailsSchema = z.object({
  address: z.string(),
  country: z.string(),
  description: z.string(),
  phone_number: z.string(),
});