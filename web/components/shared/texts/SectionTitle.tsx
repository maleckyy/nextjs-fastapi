import React from 'react'

type PropsType = {
  title: string
} & React.HTMLAttributes<HTMLDivElement>

export default function SectionTitle({ title }: PropsType) {
  return (
    <span className='truncate font-medium mb-2 lg:mb-1'>{title}</span>
  )
}
