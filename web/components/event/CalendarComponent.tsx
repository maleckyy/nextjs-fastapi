import { EventOutput } from '@/types/events/event.type'
import React, { useCallback, useEffect, useState } from 'react'
import { Calendar } from '../ui/calendar'
import { Modifiers } from 'react-day-picker'
import { CreateEventDialogRef } from './EventDialog'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import EmptyDataBox from '../shared/EmptyDataBox'

type PropsType = {
  data: EventOutput[] | undefined,
  isSuccess: boolean,
  dialogRef: React.RefObject<CreateEventDialogRef | null>
} & React.HTMLAttributes<HTMLDivElement>

export default function CalendarComponent({ data, isSuccess, dialogRef, ...props }: PropsType) {
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
    <Card className="py-4" {...props}>
      <CardContent className="px-6 flex md:flex-row gap-4 flex-col lg:flex-col xl:flex-row">
        <div className='xs:w-[300] w-[100%] mx-auto lg:w-[250px] xxl:w-[280px]'>
          <Calendar
            mode="multiple"
            selected={eventDates}
            onSelect={() => { }}
            className="bg-transparent p-0 w-full"
            required
            onDayClick={(day, modifiers: Modifiers, e: React.MouseEvent) => {
              if (e.altKey && e.button === 0) {
                if (dialogRef.current) {
                  dialogRef.current.open(day);
                }
              }
              return setSelectedDate(day)
            }}
          />
          <span className='small-text-description mt-2'>To quickly create an event, select it by holding down the left Alt key.</span>
        </div>
        <section className='flex-1'>
          <div className="flex w-full items-center justify-between">
            <div className="text-sm font-medium">
              {selectedDate.toDateString()} {selectedEvents.length > 0 && `(${selectedEvents.length})`}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              title="Add Event"
              onClick={() => dialogRef.current?.open(selectedDate)}
              aria-label='Add event button'
            >
              <PlusIcon />
              <span className="sr-only">Add Event</span>
            </Button>
          </div>
          <div className="flex w-full flex-col gap-2 mt-2 overflow-y-auto max-h-[390px]">
            {selectedEvents.map((event) => (
              <div
                key={event.title}
                className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-muted-foreground text-xs">
                  {new Date(event.event_date).toDateString()}
                </div>
              </div>
            ))}
            {selectedEvents.length === 0 && <EmptyDataBox emptyDataText='No events' />}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
