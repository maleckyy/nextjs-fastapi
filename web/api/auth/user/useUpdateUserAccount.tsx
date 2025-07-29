import { useMutation } from "@tanstack/react-query"
import { updateUserAccount } from "./updateUserAccount"

export const useUpdateUserAccount = () => {
  return useMutation({
    mutationFn: updateUserAccount
  })
}