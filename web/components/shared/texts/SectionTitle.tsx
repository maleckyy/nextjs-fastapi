import React from 'react'

export default function SectionTitle({ title }: { title: string }) {
  return (
    <span className='truncate font-medium'>{title}</span>
  )
}
