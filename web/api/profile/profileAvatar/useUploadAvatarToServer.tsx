import { uploadAvatarToServer } from "@/api/profile/profileAvatar/uploadAvatarToServer"
import { useMutation } from "@tanstack/react-query"

export const useUploadAvatarToServer = () => {
  return useMutation({
    mutationFn: uploadAvatarToServer,
  })

}


