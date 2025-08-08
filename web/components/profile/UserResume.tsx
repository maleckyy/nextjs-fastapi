'use client'
import { api } from '@/api/axios';
import { ApiEndpoints } from '@/api/routes/apiEndpoints';
import React from 'react'

export default function UserResume() {

  async function downloadCV() {
    const response = await api.get(ApiEndpoints.USER_GET_RESUME)
    const html = response.data;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  return (
    <div onClick={downloadCV} className='w-full'>Shov CV</div>
  )
}
