import { fetchWithAuth } from '@/api/axiosServer'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import PageTitle from '@/components/page-title'
import ProfileContent from '@/components/profile/profileContent'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

export default async function ProfilePage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.USER_DETAILS],
    queryFn: () => fetchWithAuth(ApiEndpoints.USER_DETAILS),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <section className='flex flex-col gap-4'>
        <PageTitle title={"Twój profil"} />
        <div>
          <ProfileContent />
        </div>
      </section>
    </HydrationBoundary>

  )
}
