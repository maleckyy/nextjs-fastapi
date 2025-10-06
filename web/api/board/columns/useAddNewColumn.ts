import { useMutation } from "@tanstack/react-query"
import { addNewColumn } from "./addNewColumn"

export const useAddNewColumn = () => {
  return useMutation({
    mutationFn: addNewColumn
  })
}