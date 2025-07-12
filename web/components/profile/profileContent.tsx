'use client'
import React from 'react'
import ProfileAvatar from './ProfileAvatar'
import UpdateDetailsDialog from './UpdateDetailsDialog'
import { useGetUserDetails } from '@/api/profile/useGetUserDetails'

export default function ProfileContent() {

  const { data, isLoading, refetch } = useGetUserDetails()

  return (
    <div className='flex justify-center flex-col items-center gap-2'>
      <ProfileAvatar username={data!.username} />
      <div className='flex items-center gap-2'>
        <h3 className='text-2xl'>{data!.username}</h3>
        <UpdateDetailsDialog userDetails={data!.details} refetch={refetch} />
      </div>
      {
        data!.details.description &&
        <div>{data!.details.description}</div>
      }
    </div>
  )
}
