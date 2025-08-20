import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { AuthUser } from "@/types/authTypes/auth.type";

export async function refreshToken(refreshToken: string): Promise<AuthUser> {
  const response = await api.post(ApiEndpoints.USER_REFRESH_TOKEN, { refresh_token: refreshToken })
  return response.data
} 