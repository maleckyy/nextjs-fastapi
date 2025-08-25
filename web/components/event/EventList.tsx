import { EventOutput } from '@/types/events/event.type'
import React, { Ref } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import DeleteEventPopover from './DeleteEventPopover'
import { useDeleteEvent } from '@/api/event/useDeleteEvent'
import EditEventDialog from './EditEventDialog'
import { createToast } from '@/lib/toastService'
import EmptyDataBox from '../shared/EmptyDataBox'
import CreateEventDialog, { CreateEventDialogRef } from './EventDialog'

type PropsType = {
  events: EventOutput[]
  refetch: () => void
  ref: Ref<CreateEventDialogRef>,
}
export default function EventList({ events, refetch, ref }: PropsType) {

  const deleteEventMutation = useDeleteEvent()
  function deleteEvent(id: string) {
    deleteEventMutation.mutate(id, {
      onSuccess: () => {
        createToast("Event deleted", "info")
        refetch()
      }
    })
  }

  return (
    <Table className='w-full table-fixed' data-testid="all-events-table">
      <TableHeader className='sticky top-0 bg-secondary z-10 shadow-sm'>
        <TableRow>
          <TableHead className='w-[30%]'>Name</TableHead>
          <TableHead className=''>Description</TableHead>
          <TableHead className="text-center w-[80px]"><CreateEventDialog ref={ref} refetch={refetch} /><span className='sr-only'>Create new event</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='overflow-y-auto'>
        {events.length > 0 ? (
          events.map((item: EventOutput) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold small-text-title text-pretty'>{item.title}</span>
                  <span className='small-text-description'>{new Date(item.event_date).toDateString()}</span>
                </div>
              </TableCell>
              <TableCell><span className='text-pretty'>{item.description}</span></TableCell>
              <TableCell>
                <div className='flex flex-row gap-2 justify-center items-center'>
                  <EditEventDialog refetch={refetch} eventItem={item} />
                  <DeleteEventPopover fn={() => deleteEvent(item.id)} popoverText='Do you want to delete this event?' />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>
              <EmptyDataBox emptyDataText="No events" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
