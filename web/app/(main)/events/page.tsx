import React from 'react'
import PageTitle from '@/components/page-title'
import PageContent from '@/components/shared/PageContent'
import PageSection from '@/components/shared/PageSection'
import EventPage from '@/components/event/EventPage'
import { Metadata } from 'next'
import { appMetadata } from '@/seoMetadata'

export const metadata: Metadata = appMetadata.calendar
export default async function Events() {
  return (
    <PageSection>
      <PageTitle title="Calendar" data-testid="event-header" />
      <PageContent>
        <EventPage />
      </PageContent>
    </PageSection>
  )
}
