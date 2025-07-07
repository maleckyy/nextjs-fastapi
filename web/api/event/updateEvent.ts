import { EventOutput } from "@/types/events/event.type"
import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function editEvent(item: EventOutput) {
    const response = await api.put(`${ApiEndpoints.EVENT_CREATE}/${item.id}`, item)
    return response.data
}