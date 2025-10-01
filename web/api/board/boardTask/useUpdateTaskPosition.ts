import { useMutation } from "@tanstack/react-query"
import { updateTaskPosition } from "./updateTaskPosition"

export const useUpdateTaskPosition = () => {
  return useMutation({
    mutationFn: updateTaskPosition
  })
}