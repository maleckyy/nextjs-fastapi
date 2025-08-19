"use client"
import { useContext, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAuthStore } from "@/store/authStore"
import { ActiveUserContext } from "@/store/activeUserContext"

export default function AppInitializer() {
  const { data: session, status } = useSession()
  const { setToken } = useAuthStore()
  const { setDetails } = useAuthStore()
  const { refetchOnLogin } = useContext(ActiveUserContext)

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isLoggedOut = localStorage.getItem("loggedOut")

    if (session?.user) {
      const storedToken = useAuthStore.getState().token
      if (storedToken === session.user.accessToken) return;
    }

    if (isLoggedOut) return
    if (status === "authenticated" && session?.user) {
      localStorage.setItem("accessToken", session.user.accessToken)
      localStorage.setItem("refreshToken", session.user.refreshToken)
      localStorage.setItem("userId", session.user.id)
      setToken(session.user.accessToken)
      setDetails(session.user.accessToken, session.user.refreshToken, session.user.tokenExpiresTime)
      refetchOnLogin()
    }
  }, [status, session?.user, setToken, setDetails, refetchOnLogin])

  return null
}