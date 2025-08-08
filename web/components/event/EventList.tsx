import { EventOutput } from '@/types/events/event.type'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import DeleteEventPopover from './DeleteEventPopover'
import { useDeleteEvent } from '@/api/event/useDeleteEvent'
import EditEventDialog from './EditEventDialog'
import { createToast } from '@/lib/toastService'
import EmptyDataBox from '../shared/EmptyDataBox'

type PropsType = {
  events: EventOutput[]
  refetch: () => void
  isLoading: boolean
}
export default function EventList({ events, refetch }: PropsType) {

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
    <div className='overflow-x-auto'>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[500px]'>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((item: EventOutput) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <span className='font-bold'>{item.title}</span>
                    <span>{new Date(item.event_date).toDateString()}</span>
                  </div>
                </TableCell>
                <TableCell>{item.description}</TableCell>
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
    </div>
  )
}
