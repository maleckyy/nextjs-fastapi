import z from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(3, "The title is too short"),
  description: z.string().optional(),
  github: z.string().url().optional(),
  demoLink: z.string().url().optional(),
  projectStack: z.string()
})

export type projectFormType = z.infer<typeof projectFormSchema>;
