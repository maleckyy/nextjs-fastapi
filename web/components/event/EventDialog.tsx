
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CirclePlus } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import AppInputField from "../loginPage/LoginInputs/LoginInput";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { api } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

type PropsType ={
    refetch: () => void
}

export default function CreateEventDialog({refetch}: PropsType) {
    const [open, setOpen] = React.useState(false);
    
    const createEventSchema = z.object({
        title: z.string({required_error: "Pole jest wymagane"}).min(3, "Tytuł jest zbyt krótki"),
        description: z.string().optional(),
        event_date: z.date()
    });
    
    type CreateEventFormType = z.infer<typeof createEventSchema>;
    
    async function createEvent(event: CreateEventFormType) {    
        const response = await api.post(ApiEndpoints.EVENT_CREATE, event)
        return response.data
    }

    const useCreateEventMutation = useMutation({
        mutationFn: createEvent
    })


    const {
        reset,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreateEventFormType>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            title: "",
            description: "",
            event_date: new Date(),
        }
    });

    function handleCreateEvent(formData: CreateEventFormType){
        const data = {
            title: formData.title,
            description: formData.description ?? '',
            event_date: formData.event_date
        }
        console.log(data)
        useCreateEventMutation.mutate(data, {
            onSuccess: () => {
                reset()
                setOpen(false)
                refetch()
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='scale-hover cursor-pointer'><CirclePlus size={24} className='mt-2'/></DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mb-2'>Utwórz nowe wydarzenie</DialogTitle>
                    <DialogDescription aria-describedby={undefined}></DialogDescription>
                    <div className="flex flex-col">
                        <AppInputField name="title" control={control} label='Nazwa zadania' error={errors.title?.message}/>
                        <AppInputField name="description" control={control} label='Nazwa zadania' error={errors.description?.message}/>

                        <Controller
                            name='event_date'
                            control={control}
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


                        <div className='flex justify-end mt-[16px]'>
                            <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleCreateEvent)} disabled={isSubmitting}>Dodaj zadanie</Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>)
}