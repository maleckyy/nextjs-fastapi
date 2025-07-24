import { useMutation } from "@tanstack/react-query"
import { updateProfileStack } from "./updateProfileStack"

export const useUpdateProfileStack = () => {
  return useMutation({
    mutationFn: updateProfileStack
  })
}