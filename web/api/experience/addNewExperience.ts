import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";
import { ExperienceFormType } from "@/schemas/experience.schema";

export async function addNewExperience(experienceData: ExperienceFormType) {
  const response = await api.post(ApiEndpoints.PROFILE_EXPERIENCE, experienceData)
  return response.data
}