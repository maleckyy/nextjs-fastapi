import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { UpdateUserAccount } from "@/types/authTypes/login.type";

export async function updateUserAccount(data: UpdateUserAccount) {
  const response = await api.put(ApiEndpoints.USER_UPDATE_ACCOUNT, data)
  return response.data

}