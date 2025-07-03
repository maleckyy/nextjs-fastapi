'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { deleteTokenCookie } from '@/actions/actions';

export default function ClientRedirect() {
  const router = useRouter();
  const { setToken, clearToken } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpireDatetime = localStorage.getItem('token_expire_datetime');
    if(!token) {
      router.push('/login');
    } else {

      if(tokenExpireDatetime) {
        const expireDate = new Date(tokenExpireDatetime)
        const currentDate = new Date()

        if (currentDate >= expireDate) {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expire_datetime');
        clearToken()
        deleteTokenCookie()
        router.push('/login');
        return;
      }
      }
      
      
      router.push('/dashboard');
      setToken(token)
    }
  }, [setToken,clearToken, router]);

  return <></>;
}