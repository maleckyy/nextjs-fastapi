import { useMutation } from "@tanstack/react-query"
import { updateColumnsOrder } from "./updateColumnsOrder"

export const useUpdateColumnsOrder = () => {
  return useMutation({
    mutationFn: updateColumnsOrder
  })
}