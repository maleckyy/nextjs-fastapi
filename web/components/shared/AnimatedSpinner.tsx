import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

type PropsType = {
  spinnerSize?: number
  className?: string
}

export default function AnimatedSpinner({ spinnerSize = 18, className }: PropsType) {
  return (
    <div className={cn('flex justify-center items-center opacity-40 p-4', className)}><LoaderCircle size={spinnerSize} className='animate-spin' /></div>
  )
}
