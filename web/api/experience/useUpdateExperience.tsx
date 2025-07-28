import { useMutation } from "@tanstack/react-query"
import { updateExperience } from "./updateExperience"

export const useUpdateExperience = () => {
  return useMutation({
    mutationFn: updateExperience
  })
}