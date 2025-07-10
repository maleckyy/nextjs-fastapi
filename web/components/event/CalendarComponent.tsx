import { EventOutput } from '@/types/events/event.type'
import React, { useCallback, useEffect, useState } from 'react'
import { Calendar } from '../ui/calendar'
import { Modifiers } from 'react-day-picker'
import { CreateEventDialogRef } from './EventDialog'

type PropsType = {
    data: EventOutput[] | undefined,
    isSuccess: boolean,
    dialogRef: React.RefObject<CreateEventDialogRef | null>
}

export default function CalendarComponent({data, isSuccess, dialogRef}: PropsType) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvents, setSelectedEvents] = useState<EventOutput[]>([])

    const eventDates = React.useMemo(() => {
    if (!data) return []
    const dates = data.map(event => new Date(event.event_date))
    const uniqueDates = Array.from(new Set(dates.map(d => d.toDateString())))
        .map(dateStr => new Date(dateStr))
    return uniqueDates
    }, [data])

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
    
    return (
        <div className="calendar flex flex-col gap-4 md:flex-row lg:flex-col lg:min-w-[300px]">
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
                  className="rounded-lg border w-full max-w-[400px]"
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
    )
}
