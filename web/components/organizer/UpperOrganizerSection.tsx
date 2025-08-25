'use client'
import { api } from '@/api/axios';
import { ApiEndpoints } from '@/api/routes/apiEndpoints';
import { QueryKeys } from '@/QueryKeys/queryKeys';
import { EventOutput } from '@/types/events/event.type';
import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react'
import { CreateEventDialogRef } from '../event/EventDialog';
import EventsDataTable from './EventsDataTable';
import CalendarComponent from '../event/CalendarComponent';

export default function UpperOrganizerSection() {
  const dialogRef = useRef<CreateEventDialogRef>(null);

  const { data, isSuccess, refetch } = useQuery<EventOutput[]>({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => (await api.get(ApiEndpoints.EVENTS)).data,
  })

  return (
    <div className='flex flex-col lg:flex-row gap-4 mb-4'>
      <CalendarComponent data={data} isSuccess={isSuccess} dialogRef={dialogRef} className="w-full lg:w-2/5" data-testid="calendar-component-card" />
      <EventsDataTable dialogRef={dialogRef} refetch={refetch} data={data} className="w-full lg:w-3/5" data-testid="all-events-card" />
    </div>
  )
}
