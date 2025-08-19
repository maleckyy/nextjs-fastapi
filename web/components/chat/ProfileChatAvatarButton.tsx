'use client'
import { UserDetailsOutput } from '@/types/profile/profile.type'
import React from 'react'
import ProfileAvatar from '../profile/ProfileAvatar'
import { api } from '@/api/axios'
import { useChatContext } from '@/store/chatContext/ActiveChatContext'
import { cn } from '@/lib/utils'

type PropsType = {
  user: UserDetailsOutput
}
export default function ProfileChatAvatarButton({ user }: PropsType) {
  const { setRoom, clientTargetId, setClientTargetId } = useChatContext()

  async function getChatRoom() {
    if (clientTargetId === user.id) return
    const response = await api.post("/chat/room" + "?target_user_id=" + user.id,
      { target_user_id: user.id }
    )
    setRoom(response.data.room_id)
    setClientTargetId(user.id)
  }

  return (
    <div onClick={getChatRoom} className={cn('flex flex-row gap-2 items-center cursor-pointer p-0 md:p-2 rounded-xl',
      clientTargetId === user.id ? "bg-secondary" : ""
    )}>
      <ProfileAvatar username={user.username} photoPath={user.details.photo_path} widthInPx={40} />
      <div className='hidden md:block'>
        <p className='leading-none font-semibold'>{user.details.first_name} {user.details.last_name}</p>
        <span className='text-muted-foreground text-sm'>{user.username}</span>
      </div>
    </div>
  )
}
