import React from 'react'

export default function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='overflow-y-auto'>{children}</div>
  )
}
