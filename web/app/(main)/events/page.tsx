'use client'
import React, { useEffect, useState, useCallback } from 'react'
import PageTitle from '@/components/page-title'
import { Calendar } from "@/components/ui/calendar"
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import { api } from '@/api/axios'
import { EventOutput } from '@/types/events/event.type'
import EventList from '@/components/event/EventList'
import { Modifiers } from 'react-day-picker'
import CreateEventDialog from '@/components/event/EventDialog'

export default function Events() {
  // Stan na wybraną datę w kalendarzu (single)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  // Wybrane eventy dla wybranej daty
  const [selectedEvents, setSelectedEvents] = useState<EventOutput[]>([])

  // Fetch eventów
  const { data, isSuccess, isLoading, refetch } = useQuery<EventOutput[]>({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => (await api.get(ApiEndpoints.EVENTS)).data,
  })

  // Funkcja filtrująca eventy z podanego dnia (ignoruje czas)
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

  // Aktualizuj wybrane eventy za każdym razem, gdy zmienia się selectedDate lub data eventów
  useEffect(() => {
    if (isSuccess) {
      const eventsForDay = getEventsByDay(selectedDate)
      setSelectedEvents(eventsForDay)
    }
  }, [selectedDate, isSuccess, getEventsByDay])

  // Wyciągamy z eventów unikalne daty na potrzeby kalendarza (format Date)
  const eventDates = React.useMemo(() => {
    if (!data) return []
    // Mapujemy event_date na Date i filtrujemy duplikaty
    const dates = data.map(event => new Date(event.event_date))
    const uniqueDates = Array.from(new Set(dates.map(d => d.toDateString())))
      .map(dateStr => new Date(dateStr))
    return uniqueDates
  }, [data])

  return (
    <section>
      <PageTitle title="Wydarzenia" />

      <div className='flex gap-4'>

        {/*  */}
        <div className="calendar flex flex-col gap-2">
          <Calendar
            mode="multiple"
            selected={eventDates}
            onDayClick={(day, modifiers: Modifiers, e:React.MouseEvent) => {
              if (e.altKey && e.button === 0) {
                console.log("ALT + lewy klik na:", day);
                // 
                //    OTWIERANIE DODANIA W DANYM DNIU 
                //
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

        {/*  */}


        </div>

        <div className='flex flex-col gap-2 w-full'>
          <div className='flex justify-between items-center'>
            <h3 className='text-2xl'>Wszystkie wydarzenia</h3>
            <span>Dodaj 

            </span>
          </div>

          { data ?
            ( <EventList events={data} refetch={refetch} isLoading={isLoading}/>):
            (<p>ładowanie</p>)
          }

        </div>
      </div>
      <CreateEventDialog refetch={refetch}/>
    </section>
  )
}
