import { EventOutput } from '@/types/events/event.type'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import DeleteEventPopover from './DeleteEventPopover'
import { useDeleteEvent } from '@/api/event/useDeleteEvent'
import EditEventDialog from './EditEventDialog'

type PropsType = {
    events: EventOutput[]
    refetch: ()=> void
    isLoading: boolean
}
export default function EventList({events, refetch}: PropsType) {

    const deleteEventMutation = useDeleteEvent()
    function deleteEvent(id: string) {
        deleteEventMutation.mutate(id, {
            onSuccess: () => {
              refetch()
            }
        })
    }

    return (
        <Table className='w-full'>
            <TableHeader>
                <TableRow>
                <TableHead className='w-[500px]'>Nazwa</TableHead>
                <TableHead>Opis</TableHead>
                <TableHead className="text-center">Akcje</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map((item: EventOutput) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <div className='flex flex-col gap-1'>
                                <span className='font-bold'>{item.title}</span>
                                <span>{new Date(item.event_date).toDateString()}</span>
                            </div>
                        </TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                            <div>
                                <EditEventDialog refetch={refetch} eventItem={item}/>
                                <DeleteEventPopover fn={()=> deleteEvent(item.id)} popoverText='Czy chcesz usunąć to wydarzenie?'/>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
