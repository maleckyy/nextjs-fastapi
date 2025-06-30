'use client'
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from './authStore';

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  token: string | null;
};

export const AuthContext = createContext<AuthContextType>({
    token: null
});

export default function AuthContextProvider({children}: Props) {
    
    const [token, setToken] = useState<string | null>(() => {
        const localToken = localStorage.getItem('token')
        return localToken || null;
    })

    const {setToken: setTokenToStore} = useAuthStore()

    useEffect(() => {
        if(token) {
            setTokenToStore(token)
        }
    },[token])
    return (
        <AuthContext.Provider value={{token}}>
            {children}
        </AuthContext.Provider>)
}
