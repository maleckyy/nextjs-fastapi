import { ExperienceFormType } from "@/schemas/experience.schema";
import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export type updateExperienceParamsType = {
  experienceData: ExperienceFormType,
  experienceId: string
}
export async function updateExperience(data: updateExperienceParamsType) {
  const response = await api.put(ApiEndpoints.PROFILE_EXPERIENCE + "/" + data.experienceId, data.experienceData)
  return response.data
}