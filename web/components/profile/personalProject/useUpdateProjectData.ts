import { useMutation } from "@tanstack/react-query"
import { updateProjectData } from "./updateProjectData"

export const useUpdateProjectData = () => {
  return useMutation({
    mutationFn: updateProjectData
  })
}