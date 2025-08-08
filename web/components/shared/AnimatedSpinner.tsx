import { LoaderCircle } from 'lucide-react'
import React from 'react'

type PropsType = {
  spinnerSize?: number
}

export default function AnimatedSpinner({ spinnerSize = 18 }: PropsType) {
  return (
    <div className='flex justify-center items-center opacity-40 p-4'><LoaderCircle size={spinnerSize} className='animate-spin' /></div>
  )
}
