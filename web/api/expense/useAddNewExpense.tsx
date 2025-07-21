import { useMutation } from "@tanstack/react-query"
import { addNewExpense } from "./addNewExpense"

export const useAddNewExpense = () => {
  return useMutation({
    mutationFn: addNewExpense
  })
}