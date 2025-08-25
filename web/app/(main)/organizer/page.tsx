import LowerOrganizerSection from '@/components/organizer/LowerOrganizerSection'
import UpperOrganizerSection from '@/components/organizer/UpperOrganizerSection'
import PageTitle from '@/components/page-title'
import PageContent from '@/components/shared/PageContent'
import PageSection from '@/components/shared/PageSection'
import { appMetadata } from '@/seoMetadata'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = appMetadata.organizer

export default function organizerPage() {
  return (
    <PageSection>
      <PageTitle title='Organizer' data-testid="organizer-header" />
      <PageContent>
        <UpperOrganizerSection />
        <LowerOrganizerSection />
      </PageContent>
    </PageSection>
  )
}
