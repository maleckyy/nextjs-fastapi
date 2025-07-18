import { useMutation } from "@tanstack/react-query"
import { updateExpense } from "./updateExpense"

export const useUpdateExpense = () => {
  return useMutation({
    mutationFn: updateExpense
  })
}