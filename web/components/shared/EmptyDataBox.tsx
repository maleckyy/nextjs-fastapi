import { Archive } from 'lucide-react'
import React from 'react'

type PropsType = {
  emptyDataText?: string
}
export default function EmptyDataBox({ emptyDataText = "No data" }: PropsType) {
  return (
    <div className='flex justify-center items-center flex-col gap-2 opacity-40 p-4'>
      <Archive size={22} />
      <p>{emptyDataText}</p>
    </div>
  )
}
