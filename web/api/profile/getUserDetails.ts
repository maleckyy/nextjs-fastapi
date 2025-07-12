import { UserDetailsOutput } from "@/types/profile/profile.type";
import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function getUserDetails(): Promise<UserDetailsOutput> {
  const response = await api.get(ApiEndpoints.USER_DETAILS)
  return response.data
}