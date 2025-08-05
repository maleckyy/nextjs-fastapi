
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type PropsType = {
  children: ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export default function PageSection({ children, className }: PropsType) {
  return (
    <section className={cn('flex flex-col gap-4 h-full min-h-0', className)}>
      {children}
    </section>
  )
}
