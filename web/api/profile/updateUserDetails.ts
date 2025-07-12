import { UserDetails } from "@/types/profile/profile.type";
import { api } from "../axios";
import { ApiEndpoints } from "../routes/apiEndpoints";

export async function updateUserDetails(newData: UserDetails) {
  const response = await api.put(ApiEndpoints.USER_DETAILS, newData)
  return response.data
}