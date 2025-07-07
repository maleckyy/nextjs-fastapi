
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Pen } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import AppInputField from "../loginPage/LoginInputs/LoginInput";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { EventOutput } from "@/types/events/event.type";
import { useEditEvent } from "@/api/event/useUpdateEvent";

type PropsType ={
    refetch: () => void,
    eventItem: EventOutput
}

export default function EditEventDialog({refetch, eventItem}: PropsType) {
    const [open, setOpen] = React.useState(false);
    
    const createEventSchema = z.object({
        title: z.string({required_error: "Pole jest wymagane"}).min(3, "Tytuł jest zbyt krótki"),
        description: z.string().optional(),
        event_date: z.date()
    });
    
    type CreateEventFormType = z.infer<typeof createEventSchema>;

    const updateEventMutatnion = useEditEvent()

    const {
        reset,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreateEventFormType>({
        resolver: zodResolver(createEventSchema),
    });

    function handleCreateEvent(formData: CreateEventFormType){
        const data = {
            title: formData.title,
            description: formData.description ?? '',
            event_date: formData.event_date
        }

        const updatedItem = {
            ...data,
            id: eventItem.id
        }
        updateEventMutatnion.mutate(updatedItem, {
            onSuccess: () => {
                reset({
                    title: eventItem.title,
                    description: eventItem.description,
                    event_date: eventItem.event_date
                })
                setOpen(false)
                refetch()
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='scale-hover cursor-pointer'><Pen size={24} className='mt-2'/></DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mb-2'>Edytuj wydarzenie</DialogTitle>
                    <DialogDescription aria-describedby={undefined}></DialogDescription>
                    <div className="flex flex-col">
                        <AppInputField name="title" control={control} label='Nazwa wydarzenia' error={errors.title?.message} defaultInputValue={eventItem.title}/>
                        <AppInputField name="description" control={control} label='Opis wydarzenia' error={errors.description?.message} defaultInputValue={eventItem.description ?? ''}/>
                        <Controller
                            name='event_date'
                            control={control}
                            defaultValue={new Date(eventItem.event_date)}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                <p>{new Date(field.value).toDateString()}</p>
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            captionLayout="dropdown"
                                        />

                                    </PopoverContent>
                                </Popover>
                            )}                        
                            />
                        {errors && <div className="mt-1 text-sm text-red-500">{errors.event_date?.message}</div>}
                        <div className='flex justify-end mt-[16px]'>
                            <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleCreateEvent)} disabled={isSubmitting}>Edytuj zadanie</Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}