'use client'
import { api } from '@/api/axios'
import React from 'react'
import { Button } from '../ui/button'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'

export default function LastTransactionsButton() {

  async function getRaportFromServer() {
    const res = await api.get(ApiEndpoints.EXPENSE_FINANCIAL_MONTHLY_RAPORT)
    const html = res.data;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }


  return (
    <Button onClick={getRaportFromServer}>Monthly Report</Button>
  )
}
