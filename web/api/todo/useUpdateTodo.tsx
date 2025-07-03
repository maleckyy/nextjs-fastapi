import { useMutation } from "@tanstack/react-query"
import { updateTodo } from "./updateTodo"

export const useUpdateMutatnion = () => {
    return useMutation({
        mutationFn: updateTodo
    })
}