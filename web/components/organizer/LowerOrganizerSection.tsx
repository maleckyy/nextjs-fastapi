import React from 'react'
import GenericCard from '../dashboard/DashboardCard'
import { EventOutput } from '@/types/events/event.type'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import SingleCardElementWithDate from '../dashboard/SingleCardElementWithDate'
import AllTodosCard from './AllTodosCard'

export default function LowerOrganizerSection() {
  return (

    <div className='flex flex-col xl:flex-row gap-4 mb-4'>
      <GenericCard<EventOutput>
        className="w-full xl:w-2/5"
        endpoint={ApiEndpoints.EVENTS_UPCOMING}
        title="Upcoming events"
        renderItem={(item, index) => <SingleCardElementWithDate title={item.title} description={item.description} key={index} index={index} date={item.event_date} />}
        noDataText='No upcoming events'
        data-testid="upcoming-events-card"
      />
      <AllTodosCard />
    </div>
  )
}
