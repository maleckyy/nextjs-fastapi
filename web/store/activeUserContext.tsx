'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserDetailsOutput } from '@/types/profile/profile.type';
import { useGetUserDetails } from '@/api/profile/useGetUserDetails';

type Props = {
  children: ReactNode;
};

type ActiveUserContextType = {
  activeUser: UserDetailsOutput | undefined,
};

export const ActiveUserContext = createContext<ActiveUserContextType>({
  activeUser: undefined,
});

export default function ActiveUserContextProvider({ children }: Props) {
  const [activeUser, setActiveUser] = useState<UserDetailsOutput | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);
  const { data } = useGetUserDetails()

  useEffect(() => {
    if (data) {
      setActiveUser(data)
    }
    setHydrated(true);
  }, [data]);

  if (!hydrated) {
    return null;
  } return (
    <ActiveUserContext.Provider value={{ activeUser }}>
      {children}
    </ActiveUserContext.Provider>
  );
}