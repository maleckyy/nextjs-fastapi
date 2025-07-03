import { api } from "@/api/axios";
import { LoginOutput } from "@/types/authTypes/login.type";

export const loginUser = async (credentials: { email: string; password: string }): Promise<LoginOutput> => {
  const params = new URLSearchParams();
  params.append('username', credentials.email);
  params.append('password', credentials.password);

  const response = await api.post('/auth/token', params, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return response.data;
};