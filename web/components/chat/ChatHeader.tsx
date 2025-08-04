import { api } from '@/api/axios'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import { useChatContext } from '@/store/chatContext/ActiveChatContext'
import { UserDetailsOutput } from '@/types/profile/profile.type'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ProfileAvatar from '../profile/ProfileAvatar'
import AnimatedSpinner from '../shared/AnimatedSpinner'

export default function ChatHeader() {
  const { clientTargetId } = useChatContext()

  async function getUserById() {
    const response = await api.get(ApiEndpoints.USER + `/${clientTargetId}`)
    return response.data
  }

  const { data } = useQuery<UserDetailsOutput>({
    queryKey: ['chat-room-client-details', clientTargetId],
    queryFn: getUserById
  })

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
