import { useMutation } from "@tanstack/react-query"
import { addNewBoard } from "./addNewBoard"

export const useAddNewBoard = () => {
  return useMutation({
    mutationFn: addNewBoard
  })
}