import { useMutation } from "@tanstack/react-query"
import { updateBoardName } from "./updateBoardName"

export const useUpdateBoardName = () => {
  return useMutation({
    mutationFn: updateBoardName
  })
}