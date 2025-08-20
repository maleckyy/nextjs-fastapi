import z from "zod";

export const avatarSchema = z.object({
  picture: z
    .any()
    .refine((file: FileList) => file?.length === 1, 'Required file')
    .refine((file: FileList) => file[0]?.size <= 5 * 1024 * 1024, 'File too large')
    .refine((file: FileList) => ['image/jpeg', 'image/png'].includes(file[0]?.type), 'Invalid format'),
})

export type AvatarFormData = z.infer<typeof avatarSchema>