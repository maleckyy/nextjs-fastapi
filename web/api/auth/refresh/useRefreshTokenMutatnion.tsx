import { useMutation } from "@tanstack/react-query"
import { refreshToken } from "./refreshToken"

export const useRefreshTokenMutation = () => {
    return useMutation({
        mutationFn: refreshToken
    })
}