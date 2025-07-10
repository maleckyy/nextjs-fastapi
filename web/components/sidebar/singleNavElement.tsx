'use client'
import { NavOptionsType } from '@/types/navigationTypes/navigation.type'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type PropsType = {
  item: NavOptionsType
}

export default function SingleNavElement({ item }: PropsType) {
  const pathname = usePathname()
  const isActive = pathname === item.path

  return (
    <Link href={item.path} key={item.title} className={clsx(
      'flex flex-row gap-2 items-center justify-start scale-hover',
      isActive && 'text-purple-300'
    )}>
      {item.iconNode}
      <div className='text-[18px] mt-1 text-inherit hidden md:block'>{item.title}</div>
    </Link>
  )
}
