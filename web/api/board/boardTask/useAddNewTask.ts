import { useMutation } from "@tanstack/react-query"
import { addNewTask } from "./addNewTask"

export const useAddNewTask = () => {
  return useMutation({
    mutationFn: addNewTask
  })
}