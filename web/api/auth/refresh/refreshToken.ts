import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { LoginOutput } from "@/types/authTypes/login.type";

export async function refreshToken(refreshToken: string): Promise<LoginOutput>{
  const response = await api.post(ApiEndpoints.USER_REFRESH_TOKEN, {refresh_token :refreshToken})
  return response.data
} 