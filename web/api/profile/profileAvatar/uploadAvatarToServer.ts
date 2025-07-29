import { api } from "@/api/axios"
import { ApiEndpoints } from "@/api/routes/apiEndpoints"

export async function uploadAvatarToServer(file: FormData) {
  const response = await api.post(ApiEndpoints.UPLOAD_AVATAR, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}