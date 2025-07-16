import { getInitials } from '@/lib/getInitials'
import clsx from 'clsx'
import React from 'react'

type PropsType = {
  username: string,
  widthInPx?: number
} & React.HTMLAttributes<HTMLDivElement>
export default function ProfileAvatar({ username, widthInPx = 60 }: PropsType) {

  const initials = getInitials(username)
  return (
    <div className={clsx('flex justify-center items-center rounded-[50%] aspect-square bg-accent', `w-[${widthInPx}px]`)}>
      <span className=''>{initials}</span>
    </div>
  )
}
