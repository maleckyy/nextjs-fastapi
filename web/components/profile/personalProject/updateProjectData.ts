import { api } from "@/api/axios"
import { ApiEndpoints } from "@/api/routes/apiEndpoints"
import { projectFormType } from "@/schemas/personalProject.schema"

export async function updateProjectData({ id, newProjectData }: { id?: string, newProjectData: projectFormType }) {
  const res = await api.put(`${ApiEndpoints.PROFILE_PERSONAL_PROJECT}/${id}`, newProjectData)
  return res.data
}
