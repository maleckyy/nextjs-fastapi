import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

type PropsType = {
  title: string
}

export default function PageTitle({ title }: PropsType) {
  return (
    <header className='flex flex-col'>
      <section className='flex items-center gap-1'>
        <SidebarTrigger className='mt-0' />
        <h1 className='text-base font-medium"'>{title}</h1>
      </section>
    </header>
  )
}
