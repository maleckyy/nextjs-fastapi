import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { Stack } from "@/types/profile/profileStack.type";

export async function getProfileStack(): Promise<Stack> {
  const response = await api.get(ApiEndpoints.PROFILE_STACK)
  return response.data
}