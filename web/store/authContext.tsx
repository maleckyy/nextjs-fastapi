'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from './authStore';

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  token: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
});

export default function AuthContextProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const { setToken: setTokenToStore } = useAuthStore();

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (token) {
      setTokenToStore(token);
    }
  }, [token, setTokenToStore]);

  if (!hydrated) {
    return null;
  }  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
}