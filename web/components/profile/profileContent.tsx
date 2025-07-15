'use client'
import React from 'react'
import ProfileAvatar from './ProfileAvatar'
import UpdateDetailsDialog from './UpdateDetailsDialog'
import { useGetUserDetails } from '@/api/profile/useGetUserDetails'
import { replaceEmptyString } from '@/lib/replaceEmptyString'
import DetailsCard from './DetailsCard'

export default function ProfileContent() {

  const { data, refetch } = useGetUserDetails()
  return (
    <>
      {data &&
        <div className='flex justify-center flex-col items-center gap-2'>
          <ProfileAvatar username={data.username} />
          <div className='flex items-center gap-2'>
            <h3 className='text-2xl'>{data.username}</h3>
            <UpdateDetailsDialog userDetails={data.details} refetch={refetch} />
          </div>
          <div>
            <DetailsCard details={data.details} email={data.email} />
          </div>
          <div>{replaceEmptyString(data.details.description, "Brak opisu")}</div>
        </div>}
    </>
  )
}
