import { useChatContext } from '@/store/chatContext/ActiveChatContext'
import React from 'react'
import ProfileAvatar from '../profile/ProfileAvatar'
import AnimatedSpinner from '../shared/AnimatedSpinner'
import { useGetUserById } from '@/api/chat/useGetUserById'

export default function ChatHeader() {
  const { clientTargetId } = useChatContext()
  const { data } = useGetUserById(clientTargetId)

  return (
    <div>
      {data ?
        (
          <div className='flex flex-row gap-4 items-center'>
            <ProfileAvatar key={data.id} username={data.username} photoPath={data.details.photo_path} widthInPx={40} />
            <span className='flex flex-col'>
              <span className='capitalize truncate font-medium '>
                {data.details.first_name + " " + data.details.last_name}
              </span>
              <span className='text-muted-foreground truncate text-xs'>
                {data.email}
              </span>
            </span>
          </div>
        ) : (
          <AnimatedSpinner />
        )
      }
    </div>
  )
}
