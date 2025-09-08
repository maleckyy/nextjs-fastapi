import { PersonalProject } from "@/types/personalProjects/personalProjects.type"
import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function getProfilePersonalProjects(): Promise<PersonalProject[]> {
  const res = await api.get(ApiEndpoints.PROFILE_PERSONAL_PROJECT)
  return res.data
}