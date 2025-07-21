import React from 'react'
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  defaultInputValue?: PathValue<T, Path<T>>
}

export default function AppDatePicker<T extends FieldValues>({ name, control, label, error, defaultInputValue }: InputProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium sr-only">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultInputValue ?? (new Date() as PathValue<T, Path<T>>)}
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
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  )
}
