import PageTitle from '@/components/page-title'
import EditProfileForm from '@/components/profile/edit/EditProfileForm'
import UpdateProfileUserForm from '@/components/profile/edit/UpdateProfileUserForm'
import UploadProfileAvatar from '@/components/profile/edit/UploadProfileAvatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default async function EditProfilePage() {
  return (
    <section className='flex flex-col gap-4 h-full'>
      <PageTitle title={"Edytuj Profil"} />
      <Tabs defaultValue="details">
        <TabsList className='p-0 mb-4'>
          <TabsTrigger value="details">Dane</TabsTrigger>
          <TabsTrigger value="image">Zdjęcie profilowe</TabsTrigger>
          <TabsTrigger value="account">Konto</TabsTrigger>
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
