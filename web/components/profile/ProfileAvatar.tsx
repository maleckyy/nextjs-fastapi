import { getInitials } from '@/lib/getInitials'
import React from 'react'

type PropsType = {
  username: string,
  widthInPx?: number
}
export default function ProfileAvatar({ username, widthInPx = 60 }: PropsType) {

  const initials = getInitials(username)
  return (
    <div className='flex justify-center items-center rounded-[50%] aspect-square bg-accent'
      style={{ width: `${widthInPx}px` }}>
      <span className=''>{initials}</span>
    </div>
  )
}
