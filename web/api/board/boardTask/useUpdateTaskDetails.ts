import { useMutation } from "@tanstack/react-query"
import { updateTaskDetails } from "./updateTaskDetails"

export const useUpdateTaskDetails = () => {
  return useMutation({
    mutationFn: updateTaskDetails
  })
}