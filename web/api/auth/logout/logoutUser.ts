import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";

export async function logoutUser() {
  const res = await api.delete(ApiEndpoints.USER_LOGOUT)
  return res.data
}