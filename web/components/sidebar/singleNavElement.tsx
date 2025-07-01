import { NavOptionsType } from '@/types/navigationTypes/navigation.type'
import Link from 'next/link'
import React from 'react'

type PropsType = {
  item: NavOptionsType
}

export default function SingleNavElement({ item }: PropsType) {
  return (
    <Link href={item.path} key={item.title} className='flex flex-row gap-2 items-center justify-start mb-2'>
        {item.iconNode}
        <div className='text-[18px] mt-1 text-inherit'>{item.title}</div>
    </Link>
  )
}
