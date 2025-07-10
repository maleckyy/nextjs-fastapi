import { EventCreate } from "@/types/events/event.type";
import { ApiEndpoints } from "../routes/apiEndpoints";
import { api } from "../axios";

export async function createEvent(event: EventCreate) {
  const response = await api.post(ApiEndpoints.EVENT_CREATE, event)
  return response.data
}