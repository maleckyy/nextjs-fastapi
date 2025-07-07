'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import PageTitle from '@/components/page-title'
import { Calendar } from "@/components/ui/calendar"
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import { api } from '@/api/axios'
import { EventOutput } from '@/types/events/event.type'
import EventList from '@/components/event/EventList'
import { Modifiers } from 'react-day-picker'
import CreateEventDialog, { CreateEventDialogRef } from '@/components/event/EventDialog'

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvents, setSelectedEvents] = useState<EventOutput[]>([])
  const dialogRef = useRef<CreateEventDialogRef>(null);
  
  const { data, isSuccess, isLoading, refetch } = useQuery<EventOutput[]>({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => (await api.get(ApiEndpoints.EVENTS)).data,
  })

  const getEventsByDay = useCallback((day: Date): EventOutput[] => {
    if (!data) return []
    return data.filter(event => {
      const eventDate = new Date(event.event_date)
      return (
        eventDate.getFullYear() === day.getFullYear() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getDate() === day.getDate()
      )
    })
  }, [data])

  useEffect(() => {
    if (isSuccess) {
      const eventsForDay = getEventsByDay(selectedDate)
      setSelectedEvents(eventsForDay)
    }
  }, [selectedDate, isSuccess, getEventsByDay])

  const eventDates = React.useMemo(() => {
    if (!data) return []
    const dates = data.map(event => new Date(event.event_date))
    const uniqueDates = Array.from(new Set(dates.map(d => d.toDateString())))
      .map(dateStr => new Date(dateStr))
    return uniqueDates
  }, [data])

  return (
    <section>
      <PageTitle title="Wydarzenia" />
      <div className='flex gap-4'>
        <div className="calendar flex flex-col gap-2">
          <Calendar
            mode="multiple"
            selected={eventDates}
            onDayClick={(day, modifiers: Modifiers, e:React.MouseEvent) => {
              if (e.altKey && e.button === 0) {
                if (dialogRef.current) {
                  dialogRef.current.open(day);
                }
              }
              return setSelectedDate(day)
            }}
            onSelect={() => {}}
            className="rounded-lg border w-[320px]"
            classNames={{
              day_selected: "bg-purple-500 text-white hover:bg-purple-600"
            }}
            modifiers={{
              highlighted: new Date()
            }}
            modifiersClassNames={{
              today: "bg-blue-500 text-white font-bold rounded-md border shadow-lg"
            }}
          />
          <div>
            <h4 className='font-bold mb-1'>Wydarzenia w dniu {selectedDate.toDateString()}</h4>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((item, index) => (
                <p key={item.id}>{index+1}.{item.title}</p>
              ))
            ) : (
              <p>Brak wydarzeń dla wybranego dnia</p>
            )}
          </div>
        </div>
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
