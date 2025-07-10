import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function deleteEventById(eventId: string) {
  const response = await api.delete(`${ApiEndpoints.EVENTS}/${eventId}`)
  return response.data
}