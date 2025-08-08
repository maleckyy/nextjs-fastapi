import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CirclePlus } from "lucide-react";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import AppInputField from "../shared/Inputs/AppInput";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useCreateEvent } from "@/api/event/useCreateEvent";
import { createToast } from "@/lib/toastService";

export type CreateEventDialogRef = {
  open: (day?: Date) => void;
  close: () => void;
};

type PropsType = {
  refetch: () => void;
};

const CreateEventDialog = forwardRef<CreateEventDialogRef, PropsType>(
  ({ refetch }, ref) => {
    const [open, setOpen] = useState(false);
    const [initialDate, setInitialDate] = useState<Date | null>(null);
    const createEventSchema = z.object({
      title: z.string({ required_error: "This field is required" }).min(3, "The title is too short"),
      description: z.string().optional(),
      event_date: z.date(),
    });

    type CreateEventFormType = z.infer<typeof createEventSchema>;

    const createEventMutation = useCreateEvent();

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
      },
    });

    useEffect(() => {
      if (open && initialDate) {
        reset({
          title: "",
          description: "",
          event_date: initialDate,
        });
      }
    }, [open, initialDate, reset]);

    useImperativeHandle(ref, () => ({
      open: (day?: Date) => {
        setInitialDate(day ?? new Date());
        setOpen(true);
      },
      close: () => setOpen(false),
    }));

    function handleCreateEvent(formData: CreateEventFormType) {
      const data = {
        title: formData.title,
        description: formData.description ?? "",
        event_date: formData.event_date,
      };

      createEventMutation.mutate(data, {
        onSuccess: () => {
          createToast("Event created", "success")
          reset();
          setOpen(false);
          refetch();
        },
      });
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="scale-hover cursor-pointer">
          <CirclePlus size={24} className="mt-2" />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Create new event</DialogTitle>
            <DialogDescription></DialogDescription>

            <div className="flex flex-col">
              <AppInputField
                name="title"
                control={control}
                label="Event name"
                error={errors.title?.message}
              />
              <AppInputField
                name="description"
                control={control}
                label="Event description"
                error={errors.description?.message}
              />
              <Controller
                name="event_date"
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
                          <span>Wybierz datę</span>
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

              <div className="flex justify-end mt-[16px]">
                <Button
                  className="scale-hover cursor-pointer"
                  onClick={handleSubmit(handleCreateEvent)}
                  disabled={isSubmitting}
                >
                  Add event
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
);
CreateEventDialog.displayName = "CreateEventDialog";

export default CreateEventDialog;
