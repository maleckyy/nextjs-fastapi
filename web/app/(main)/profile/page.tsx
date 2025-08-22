import { fetchWithAuth } from '@/api/axiosServer'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import PageTitle from '@/components/page-title'
import ProfileContent from '@/components/profile/profileContent'
import PageContent from '@/components/shared/PageContent'
import PageSection from '@/components/shared/PageSection'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { appMetadata } from '@/seoMetadata'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = appMetadata.profile

export default async function ProfilePage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.USER_DETAILS],
    queryFn: () => fetchWithAuth(ApiEndpoints.USER_DETAILS),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageSection>
        <PageTitle title={"Profile"} data-testid="profile-header" />
        <PageContent>
          <ProfileContent />
        </PageContent>
      </PageSection>
    </HydrationBoundary>
  )
}
