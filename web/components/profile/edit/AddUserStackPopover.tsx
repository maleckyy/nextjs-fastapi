import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Plus } from 'lucide-react'
import React from 'react'
import AddUserStackFormField from './AddUserStackFormField'

export default function AddUserStackPopover() {

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Plus />
      </PopoverTrigger>
      <PopoverContent className="w-100" side='left'>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Edytuj umiejętności</h4>
            <p className="text-muted-foreground text-sm">
              Wypisz umiejętności oddzielając je przecinkiem
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <AddUserStackFormField />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
