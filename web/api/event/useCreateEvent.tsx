import { useMutation } from "@tanstack/react-query"
import { createEvent } from "./createEvent"

export const useCreateEvent = () => {
    return useMutation({
        mutationFn: createEvent
    })
}