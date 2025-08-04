import { API_BASE_URL } from '@/env/API_URL'
import { getInitials } from '@/lib/getInitials'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type PropsType = {
  username: string,
  widthInPx?: number,
  photoPath?: string,
  preview?: string | null
}
export default function ProfileAvatar({ username, widthInPx = 60, photoPath, preview }: PropsType) {
  const initials = getInitials(username)
  return (
    <Avatar style={{ width: `${widthInPx}px`, height: `${widthInPx}px` }}>
      {photoPath && <AvatarImage src={preview || `${API_BASE_URL}/${photoPath}`} alt='Profile Picture' />}
      <AvatarFallback delayMs={25}>{initials}</AvatarFallback>
    </Avatar>
  )
}
