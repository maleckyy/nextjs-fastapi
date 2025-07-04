'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { createTokenCookie, deleteTokenCookie } from '@/actions/actions';

export default function ClientRedirect() {
  const router = useRouter();
  const { clearToken, setDetails } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpireDatetime = localStorage.getItem('token_expire_datetime');
    const refreshToken = localStorage.getItem('refresh_token');

    if(!token || !tokenExpireDatetime || !refreshToken) {
      router.push('/login');
    } else {

      if(tokenExpireDatetime) {
        const expireDate = new Date(tokenExpireDatetime)
        const currentDate = new Date()

        if (currentDate >= expireDate) {
          localStorage.removeItem('token');
          localStorage.removeItem('token_expire_datetime');
          localStorage.removeItem('refresh_token');
          clearToken()
          deleteTokenCookie()
          router.push('/login');
          return;
        }
      }

      setDetails(token, refreshToken, tokenExpireDatetime)
      createTokenCookie(token)
      router.push('/dashboard');
    }
  }, [setDetails ,clearToken, router]);

  return <></>;
}