import { User } from '@/types/authTypes/login.type'
import { create } from 'zustand'

type authStoreProps = {
    user: User | null,
    setUser: (user: User)=> void,
    clearUser: ()=>void
}

function getUser() {
    const user = localStorage.getItem('user')
    if(user !== null) {
        return JSON.parse(localStorage.getItem('user')!)
    } else {
        return null
    }
}

export const useUserStore = create<authStoreProps>((set) => ({
  user: getUser(),
  setUser: (user:User) => set({ user: user}),
  clearUser: () => set({ user: null}),
}))