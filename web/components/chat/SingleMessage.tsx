import { cn } from '@/lib/utils'
import { ChatMessage } from '@/types/chat/chat.type'
import React from 'react'
import ProfileAvatar from '../profile/ProfileAvatar'

type PropsType = {
  message: ChatMessage,
  currentUserId: string | undefined
}
function SingleMessage({ message, currentUserId }: PropsType) {
  return (
    <div className={cn("flex flex-col", currentUserId === message.client.user_id ? "items-end" : "items-start")}>
      <div className={cn('flex gap-2 items-end w-full',
        currentUserId === message.client.user_id ? "flex-row-reverse" : "flex-row"
      )}>
        <ProfileAvatar username={message.client.username} photoPath={message.client.avatarUrl} widthInPx={36} />
        <span className={cn("py-2 px-3 rounded-xl text-sm  max-w-[70%]",
          currentUserId === message.client.user_id ? "bg-primary text-secondary" : "bg-muted"
        )}>
          {message.message}
        </span>
      </div>
    </div>
  )
}

export default React.memo(SingleMessage)