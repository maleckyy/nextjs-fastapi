import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

type PropsType = {
  title: string
}

export default function PageTitle({ title, ...props }: PropsType) {
  return (
    <header className='flex flex-col' {...props}>
      <section className='flex items-center gap-1'>
        <SidebarTrigger className='mt-0' data-testid="sidebar-toggle-button" />
        <h2 className='text-base font-medium"'>{title}</h2>
      </section>
    </header>
  )
}
