import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function getUserById(clientTargetId: string) {
  const response = await api.get(ApiEndpoints.USER + `/${clientTargetId}`)
  return response.data
}
