import { useMutation } from "@tanstack/react-query"
import { deleteBoardColumn } from "./deleteColumn"

export const useDeleteColumn = () => {
  return useMutation({
    mutationFn: deleteBoardColumn
  })
}