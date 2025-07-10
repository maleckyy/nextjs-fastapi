import { formatDate } from '@/lib/formatDate'
import React from 'react'
type PropsType = {
  date: string
}
export default function FormatedDate({ date }: PropsType) {
  return (
    <>{formatDate(date)}</>
  )
}
