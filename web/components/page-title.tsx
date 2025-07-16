import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

type PropsType = {
  title: string
}

export default function PageTitle({ title }: PropsType) {
  return (
    <section className='flex items-center gap-1'>
      <SidebarTrigger className='mt-1' />
      <h2 className='text-xl'>{title}</h2>
    </section>
  )
}
