'use server'
import { fetchWithAuth } from '@/api/axiosServer'
import { UserDetailsOutput } from '@/types/profile/profile.type'
import React from 'react'
import ProfileChatAvatarButton from './ProfileChatAvatarButton'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export default async function AllUsersSidebar() {
  const allUsers: UserDetailsOutput[] = await fetchWithAuth('/user/all')

  return (
    <div className='flex 
      flex-row
      md:flex-col gap-2 
      overflow-y
      lg:w-[300px] md:w-[200px] w-full'>
      <ScrollArea className="max-w-[100%] w-full md:w-[350]">
        <div className='flex flex-row md:flex-col gap-2 w-full'>
          {allUsers.map((data) => {
            return <ProfileChatAvatarButton key={data.id} user={data} />
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}