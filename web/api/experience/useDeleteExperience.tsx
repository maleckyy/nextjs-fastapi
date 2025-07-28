import { useMutation } from "@tanstack/react-query"
import { deleteExperienceById } from "./deleteExperienceById"

export const useDeleteExperience = () => {
  return useMutation({
    mutationFn: deleteExperienceById
  })
}