'use client'
import { api } from '@/api/axios';
import { ApiEndpoints } from '@/api/routes/apiEndpoints';
import { QueryKeys } from '@/QueryKeys/queryKeys';
import { EventOutput } from '@/types/events/event.type';
import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react'
import AnimatedSpinner from '../shared/AnimatedSpinner';
import SectionTitle from '../shared/texts/SectionTitle';
import CalendarComponent from './CalendarComponent';
import CreateEventDialog, { CreateEventDialogRef } from './EventDialog';
import EventList from './EventList';

export default function EventPage() {
  const dialogRef = useRef<CreateEventDialogRef>(null);

  const { data, isSuccess, isLoading, refetch } = useQuery<EventOutput[]>({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => (await api.get(ApiEndpoints.EVENTS)).data,
  })

  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      <CalendarComponent data={data} isSuccess={isSuccess} dialogRef={dialogRef} />
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex justify-between items-center'>
          <SectionTitle title='All events' />
          <span><CreateEventDialog ref={dialogRef} refetch={refetch} /></span>
        </div>
        {data ?
          (<EventList events={data} refetch={refetch} isLoading={isLoading} />) :
          (<AnimatedSpinner />)
        }
      </div>
    </div>
  )
}
