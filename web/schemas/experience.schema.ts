import { z } from 'zod';

export const profileExperienceSchema = z.object({
  position: z.string({ message: "Pole jest wymagane" }).min(3, { message: "Nazwa roli jest zbyt którka" }),
  description: z.string().optional(),
  starting_date: z.date(),
  ending_date: z.date().optional(),
}).refine(
  (data) => {
    if (!data.ending_date) return true
    return data.ending_date > data.starting_date
  },
  { message: "Data zakończenia musi być późniejsza niż data rozpoczęcia", path: ["ending_date"] }
);

export type ExperienceFormType = z.infer<typeof profileExperienceSchema>;