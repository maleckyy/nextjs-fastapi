import { z } from 'zod';

export const profileExperienceSchema = z.object({
  position: z.string({ message: "Field is required" }).min(3, { message: "The role name is too short" }),
  description: z.string().optional(),
  starting_date: z.date(),
  ending_date: z.date().optional(),
}).refine(
  (data) => {
    if (!data.ending_date) return true
    return data.ending_date > data.starting_date
  },
  { message: "The end date must be later than the start date", path: ["ending_date"] }
);

export type ExperienceFormType = z.infer<typeof profileExperienceSchema>;