'use server';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import axios from 'axios';
import { API_BASE_URL } from '@/env/API_URL';
import { AxiosRequestConfig } from 'axios';

export async function fetchWithAuth(url: string, options?: AxiosRequestConfig) {
  const endpoint = API_BASE_URL + url;
  const session = await auth();

  if (!session?.user?.accessToken) {
    redirect("/login");
  }

  const { headers: optHeaders, ...rest } = options || {};

  const response = await axios.get(endpoint, {
    ...rest,
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      ...optHeaders,
    },
  });

  return response.data;
}