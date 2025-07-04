
'use client'
import { useEffect } from 'react';
import { isTokenExpiredISO } from '@/lib/tokenExpire';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { deleteTokenCookie } from '@/actions/actions';


export default function TokenWatcher() {
  const { maybeRefresh } = useTokenRefresh()

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkToken = () => {
      const expiration = localStorage.getItem('token_expire_datetime');

      if (!expiration || isTokenExpiredISO(expiration)) {
        console.warn('Token wygasł lub zaraz wygaśnie.');
        localStorage.removeItem('token');
        localStorage.removeItem('token_expire_datetime');
        localStorage.removeItem('refresh_token');
        deleteTokenCookie()
        maybeRefresh()
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 60 * 1000);

    return () => clearInterval(interval);

  }, [maybeRefresh]);

  return null;
}
