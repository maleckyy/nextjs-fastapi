import { useMutation } from "@tanstack/react-query"
import { deleteExpense } from "./deleteExpense"

export const useDeleteExpense = () => {
  return useMutation({
    mutationFn: deleteExpense
  })
}