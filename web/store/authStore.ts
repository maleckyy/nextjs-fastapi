import { create } from 'zustand'

type authStoreProps = {
  token: string | null | undefined,
  refreshToken: string | null,
  expireTime: null | number
  setToken: (newToken: string) => void,
  setDetails: (newToken: string, newRefreshToken: string, newExpireTime: number) => void,
  clearToken: () => void
}

export const useAuthStore = create<authStoreProps>((set) => ({
  token: null,
  refreshToken: null,
  expireTime: null,
  setToken: (newToken: string) => set({ token: newToken }),
  setDetails: (newToken: string, newRefreshToken: string, newExpireTime: number) => set({ token: newToken, refreshToken: newRefreshToken, expireTime: newExpireTime }),
  clearToken: () => set({ token: null, refreshToken: null, expireTime: null }),
}))