import React from 'react'
import ProfileAvatar from './ProfileAvatar'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import { fetchWithAuth } from '@/api/axiosServer'
import { Separator } from '../ui/separator'
import { Ellipsis } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { replaceEmptyString } from '@/lib/replaceEmptyString'
import DetailsCard from './DetailsCard'
import { UserDetailsOutput } from '@/types/profile/profile.type'
import ProfileExperience from './ProfileExperience'
import UserResume from './UserResume'
import ProfileStack from './ProfileStack'
import { ExperienceDialogProvider } from '@/store/experience/ExperienceDialogContext'
import SectionTitle from '../shared/texts/SectionTitle'

export default async function ProfileContent() {
  const data: UserDetailsOutput = await fetchWithAuth(ApiEndpoints.USER_DETAILS)
  return (
    <ExperienceDialogProvider>
      <div className='flex flex-col lg:flex-row items-start gap-4 flex-1'>
        <div className='flex justify-center flex-col gap-4 w-full lg:w-1/3'>
          <div className='flex flex-row items-start gap-4 w-full'>
            <div className='flex flex-row items-center gap-2'>
              <ProfileAvatar username={data.username} widthInPx={60} photoPath={data.details.photo_path} />
              <div className='flex flex-col'>
                <h3 className='medium-text-title font-medium'>{data.details.first_name} {data.details.last_name}</h3>
                <h4 className='extra-small-text-description'>{data.username}</h4>
              </div>
            </div>
            <div className='ml-auto'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button aria-label="Profile dropdown button" >
                    <Ellipsis />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='left'>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/edit" className='w-full'>Edit profile</Link>
                  </DropdownMenuItem>
                  <UserResume />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <SectionTitle title='About' />
            <>{replaceEmptyString(data.details.description, "No data")}</>
          </div>
          <Separator />
          <div className='flex flex-col gap-2'>
            <SectionTitle title='Details' />
            <DetailsCard details={data.details} email={data.email} />
          </div>
        </div>
        <Separator orientation='vertical' className='h-full hidden lg:block' />
        <Separator className='lg:hidden block' />
        <div className='lg:w-2/3 flex flex-col gap-4 w-full'>
          <ProfileExperience />
          <Separator />
          <ProfileStack />
        </div>
      </div>
    </ExperienceDialogProvider>
  )
}
