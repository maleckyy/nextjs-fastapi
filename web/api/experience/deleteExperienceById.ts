import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function deleteExperienceById(experienceId: string) {
  const response = await api.delete(ApiEndpoints.PROFILE_EXPERIENCE + "/" + experienceId)
  return response.data
}