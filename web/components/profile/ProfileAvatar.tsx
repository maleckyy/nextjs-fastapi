import { API_BASE_URL } from '@/env/API_URL'
import { getInitials } from '@/lib/getInitials'
import Image from 'next/image'
import React from 'react'

type PropsType = {
  username: string,
  widthInPx?: number,
  photoPath?: string
}
export default function ProfileAvatar({ username, widthInPx = 60, photoPath }: PropsType) {
  const initials = getInitials(username)
  return (
    <div className='flex justify-center items-center rounded-[50%] aspect-square bg-accent'
      style={{ width: `${widthInPx}px` }}>
      {photoPath ? (<Image src={`${API_BASE_URL}/${photoPath}`} alt={'Profile Pic'} width={300} height={300} />) : (<span className=''>{initials}</span>)}
    </div>
  )
}
