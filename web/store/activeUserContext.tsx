'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserDetailsOutput } from '@/types/profile/profile.type';
import { useGetUserDetails } from '@/api/profile/useGetUserDetails';

type Props = {
  children: ReactNode;
};

type ActiveUserContextType = {
  activeUser: UserDetailsOutput | undefined,
  clearData: () => void,
  refetchOnLogin: () => void
};

export const ActiveUserContext = createContext<ActiveUserContextType>({
  activeUser: undefined,
  clearData: () => { },
  refetchOnLogin: () => { }
});

export default function ActiveUserContextProvider({ children }: Props) {
  const [activeUser, setActiveUser] = useState<UserDetailsOutput | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);
  const { data, refetch } = useGetUserDetails()

  function clearData() {
    setActiveUser(undefined)
  }

  function refetchOnLogin() {
    refetch()
  }

  useEffect(() => {
    if (data) {
      setActiveUser(data)
    }
    setHydrated(true);
  }, [data]);

  if (!hydrated) {
    return null;
  } return (
    <ActiveUserContext.Provider value={{ activeUser, clearData, refetchOnLogin }}>
      {children}
    </ActiveUserContext.Provider>
  );
}