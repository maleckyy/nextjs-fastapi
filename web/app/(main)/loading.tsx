import AnimatedSpinner from '@/components/shared/AnimatedSpinner'
import React from 'react'

export default function LoadingPage() {
  return (
    <div className='flex flex-col'>
      <p>Loading...</p>
      <AnimatedSpinner spinnerSize={48} />
    </div>
  )
}
