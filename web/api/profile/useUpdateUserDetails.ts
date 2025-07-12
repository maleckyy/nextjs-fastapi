import { useMutation } from "@tanstack/react-query"
import { updateUserDetails } from "./updateUserDetails"

export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: updateUserDetails
  })
}