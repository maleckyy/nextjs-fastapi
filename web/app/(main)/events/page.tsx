'use client'
import React, { useRef } from 'react'
import PageTitle from '@/components/page-title'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import { api } from '@/api/axios'
import { EventOutput } from '@/types/events/event.type'
import EventList from '@/components/event/EventList'
import CreateEventDialog, { CreateEventDialogRef } from '@/components/event/EventDialog'
import CalendarComponent from '@/components/event/CalendarComponent'

export default function Events() {
  const dialogRef = useRef<CreateEventDialogRef>(null);
  
  const { data, isSuccess, isLoading, refetch } = useQuery<EventOutput[]>({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => (await api.get(ApiEndpoints.EVENTS)).data,
  })

  return (
    <section>
      <PageTitle title="Wydarzenia" />
      <div className='flex flex-col lg:flex-row gap-4'>
        <CalendarComponent data={data} isSuccess={isSuccess} dialogRef={dialogRef}/>

        <div className='flex flex-col gap-2 w-full'>
          <div className='flex justify-between items-center'>
            <h3 className='text-2xl'>Wszystkie wydarzenia</h3>
            <span><CreateEventDialog ref={dialogRef} refetch={refetch} /></span>
          </div>
          { data ?
            ( <EventList events={data} refetch={refetch} isLoading={isLoading}/>):
            (<p>ładowanie</p>)
          }
        </div>
      </div>
    </section>
  )
}
