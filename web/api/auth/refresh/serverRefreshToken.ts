import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { API_BASE_URL } from "@/env/API_URL";
import { AuthUser } from "@/types/authTypes/auth.type"
import axios from "axios"

export async function serverRefreshToken(refreshToken: string): Promise<AuthUser> {
  const endpoint = API_BASE_URL + ApiEndpoints.USER_REFRESH_TOKEN;
  const response = await axios.post(
    endpoint,
    { refresh_token: refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}