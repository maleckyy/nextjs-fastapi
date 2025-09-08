import { projectFormType } from "@/schemas/personalProject.schema"
import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export async function createNewProject(newProjectData: projectFormType) {
  const res = await api.post(ApiEndpoints.PROFILE_PERSONAL_PROJECT, newProjectData)
  return res.data
}