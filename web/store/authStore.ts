import { create } from 'zustand'

type authStoreProps = {
  token:string | null | undefined,
  refreshToken: string | null,
  tokenExpiresTime: number | null
  setToken: (newToken:string)=> void,
  setdetails: (newToken:string, newRefreshToken: string, newExpiresTime: number)=> void,
  clearToken: ()=>void
}

export const useAuthStore = create<authStoreProps>((set) => ({
  token: null,
  refreshToken: null,
  tokenExpiresTime: null,
  setToken: (newToken:string) => set({ token: newToken }),
  setdetails: (newToken:string, newRefreshToken: string, newExpiresTime: number) => set({ token: newToken, refreshToken: newRefreshToken, tokenExpiresTime:newExpiresTime}),
  clearToken: () => set({ token: null, refreshToken: null, tokenExpiresTime: null }),
}))