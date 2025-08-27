import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function deletePersonalProject(id: string) {
  const res = await api.delete(ApiEndpoints.PROFILE_PERSONAL_PROJECT + "/" + id)
  return res.data
}