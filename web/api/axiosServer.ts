'use server';
import { cookies } from 'next/headers';
import { api } from './axios';

export async function fetchWithAuth(url: string, options?: object) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error('Brak tokenu uwierzytelniającego');
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    ...options,
  };

  const response = await api.get(url, {
    ...options,
    headers,
  });

  return response.data;
}