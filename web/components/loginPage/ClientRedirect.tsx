'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function ClientRedirect() {
  const router = useRouter();
  const { setToken } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      router.push('/login');
    } else {
      router.push('/dashboard');
      setToken(token)
    }
  }, []);

  return <></>;
}