'use client'
import { api } from '@/api/axios'
import React from 'react'
import { Button } from '../ui/button'

export default function LastTransactionsButton() {

  async function getttt() {
    const res = await api.get("/expenses/financial-report")
    console.log(res.data)
    const html = res.data;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }


  return (
    <Button onClick={getttt}>Monthly Report</Button>
  )
}
