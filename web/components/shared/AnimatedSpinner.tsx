import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function AnimatedSpinner() {
  return (
    <div className='flex justify-center items-center opacity-40 p-4'><LoaderCircle className='animate-spin' /></div>
  )
}
