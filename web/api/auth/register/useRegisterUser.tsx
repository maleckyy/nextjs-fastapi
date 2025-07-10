import { useMutation } from "@tanstack/react-query"
import { registerUser } from "./registerUser"

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser
  })
}