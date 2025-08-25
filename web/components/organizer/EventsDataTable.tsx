import { Ref } from "react";
import { CreateEventDialogRef } from "../event/EventDialog";
import EventList from "../event/EventList";
import AnimatedSpinner from "../shared/AnimatedSpinner";
import { EventOutput } from "@/types/events/event.type";
import { Card, CardContent, CardDescription } from "../ui/card";

type PropsType = {
  dialogRef: Ref<CreateEventDialogRef>,
  refetch: () => void,
  data: EventOutput[] | undefined,
} & React.HTMLAttributes<HTMLDivElement>

export default function EventsDataTable({ dialogRef, refetch, data, ...props }: PropsType) {
  return (
    <Card className="flex-1 max-h-[500px]" {...props}>
      <CardDescription className="px-6">
        <h3 className="text-base">All Events</h3>
      </CardDescription>
      <CardContent className="flex-1 overflow-x-auto">
        {data ? <EventList events={data} refetch={refetch} ref={dialogRef} /> : <AnimatedSpinner />}
      </CardContent>
    </Card>
  );
}