import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { RegisterFormType } from "@/types/authTypes/login.type";

export async function registerUser(newUser: RegisterFormType) {
  const response = await api.post(ApiEndpoints.USER_CREATE, newUser)
  return response.data
}