import PageTitle from '@/components/page-title'
import EditProfileForm from '@/components/profile/edit/EditProfileForm'
import React from 'react'

export default async function EditProfilePage() {
  return (
    <section className='flex flex-col gap-4 h-full'>
      <PageTitle title={"Edytuj Profil"} />
      <EditProfileForm />
    </section>
  )
}
