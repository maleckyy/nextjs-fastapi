import { getInitials } from '@/lib/getInitials'
import React from 'react'

type PropsType = {
  username: string
} & React.HTMLAttributes<HTMLDivElement>
export default function ProfileAvatar({ username }: PropsType) {

  const initials = getInitials(username)
  return (
    <div className='flex justify-center items-center rounded-[50%] aspect-square bg-accent w-[60px]'>
      <span className=''>{initials}</span>
    </div>
  )
}
