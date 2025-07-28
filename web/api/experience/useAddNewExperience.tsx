import { useMutation } from "@tanstack/react-query"
import { addNewExperience } from "./addNewExperience"

export const useAddNewExperience = () => {
  return useMutation({
    mutationFn: addNewExperience
  })
}