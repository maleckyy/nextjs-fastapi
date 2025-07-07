import { useMutation } from "@tanstack/react-query"
import { editEvent } from "./updateEvent"

export const useEditEvent = () => {
    return useMutation({
        mutationFn: editEvent
    })
}
