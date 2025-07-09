'use client'
import { createTokenCookie } from "@/actions/actions"
import { useRefreshTokenMutation } from "@/api/auth/refresh/useRefreshTokenMutatnion"
import { useAuthStore } from "@/store/authStore"
import { setStringValueToLocalStorage } from "@/store/localStorage"
import { LoginOutput } from "@/types/authTypes/login.type"
import { useRouter } from "next/navigation"

export function useTokenRefresh() {
    const refreshToken = useAuthStore((state) => state.refreshToken)
    const setDetails = useAuthStore((state) => state.setDetails)
    const refreshMutation = useRefreshTokenMutation()
    const router = useRouter()
  const maybeRefresh = () => {
    if (!refreshToken) return

        refreshMutation.mutate(refreshToken, {
        onSuccess: (response: LoginOutput) => {
            setStringValueToLocalStorage("token", response.access_token)
            setStringValueToLocalStorage("token_expire_datetime", response.expire_datetime)
            setStringValueToLocalStorage("refresh_token", response.refreshToken)

            setDetails(response.access_token, response.refreshToken, response.expire_datetime)
            createTokenCookie(response.access_token, response.token_expires_time)
        },
        onError: (err) => {
            console.error("[REFRESH ERROR]", err)
            router.push('/login')
        }
        })
    }

    return { maybeRefresh }
}
