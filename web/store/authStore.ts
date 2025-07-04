import { create } from 'zustand'

type authStoreProps = {
  token: string | null | undefined,
  refreshToken: string | null,
  expireDatetime: string | null
  setToken: (newToken:string)=> void,
  setDetails: (newToken:string, newRefreshToken: string, newExpire_datetime: string)=> void,
  clearToken: ()=>void
}

export const useAuthStore = create<authStoreProps>((set) => ({
  token: null,
  refreshToken: null,
  expireDatetime: null,
  setToken: (newToken:string) => set({ token: newToken }),
  setDetails: (newToken:string, newRefreshToken: string, newExpire_datetime: string) => set({ token: newToken, refreshToken: newRefreshToken, expireDatetime:newExpire_datetime}),
  clearToken: () => set({ token: null, refreshToken: null, expireDatetime: null }),
}))