import PageTitle from '@/components/page-title'
import EditProfileForm from '@/components/profile/edit/EditProfileForm'
import UpdateProfileUserForm from '@/components/profile/edit/UpdateProfileUserForm'
import UploadProfileAvatar from '@/components/profile/edit/UploadProfileAvatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default async function EditProfilePage() {
  return (
    <section className='flex flex-col gap-4 h-full'>
      <PageTitle title={"Edit profile"} />
      <Tabs defaultValue="details">
        <TabsList className='p-0 mb-4'>
          <TabsTrigger value="details">About</TabsTrigger>
          <TabsTrigger value="image">Avatar</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <EditProfileForm />
        </TabsContent>
        <TabsContent value="image">
          <UploadProfileAvatar />
        </TabsContent>
        <TabsContent value="account">
          <UpdateProfileUserForm />
        </TabsContent>
      </Tabs>
    </section>
  )
}
