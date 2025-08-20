import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { AuthUser } from "@/types/authTypes/auth.type";

export const loginUser = async (credentials: { email: string; password: string }): Promise<AuthUser> => {
  const params = new URLSearchParams();
  params.append('username', credentials.email);
  params.append('password', credentials.password);

  const response = await api.post(ApiEndpoints.USER_LOGIN, params, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return response.data;
};