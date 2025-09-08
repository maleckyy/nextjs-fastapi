import { useMutation } from "@tanstack/react-query"
import { deletePersonalProject } from "./deletePersonalProject"

export const useDeletePersonalProject = () => {
  return useMutation({
    mutationFn: deletePersonalProject
  })
}