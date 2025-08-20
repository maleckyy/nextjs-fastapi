import AnimatedSpinner from '@/components/shared/AnimatedSpinner'
import React from 'react'

export default function LoadingPage() {
  return (
    <div className='flex flex-col'>
      <AnimatedSpinner spinnerSize={48} />
    </div>
  )
}
