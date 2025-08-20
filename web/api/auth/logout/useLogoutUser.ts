import { useMutation } from "@tanstack/react-query"
import { logoutUser } from "./logoutUser"

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: logoutUser
  })
}