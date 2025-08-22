'use client'
import { NavOptionsType } from '@/types/navigationTypes/navigation.type'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'

type PropsType = {
  item: NavOptionsType
}

export default function SingleNavElement({ item }: PropsType) {
  const pathname = usePathname()
  const isActive = pathname === item.path

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild tooltip={item.title} className={clsx(
        'flex flex-row gap-2 items-center justify-start scale-hover',
        isActive && 'bg-primary'
      )}>
        <Link href={item.path} className={clsx(isActive && 'text-secondary')} aria-label={`${item.title} page link`}>
          {item.iconNode}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
