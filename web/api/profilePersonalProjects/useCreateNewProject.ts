import { useMutation } from "@tanstack/react-query"
import { createNewProject } from "./createNewProject"

export const useCreateNewProject = () => {
  return useMutation({
    mutationFn: createNewProject
  })
}