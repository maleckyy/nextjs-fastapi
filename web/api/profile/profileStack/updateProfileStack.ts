import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { Stack } from "@/types/profile/profileStack.type";

export async function updateProfileStack(stack: Stack) {
  const response = await api.put(ApiEndpoints.PROFILE_STACK, stack)
  return response.data
} 