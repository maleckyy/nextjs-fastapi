import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Pen } from 'lucide-react'
import React from 'react'
import AddUserStackFormField from './AddUserStackFormField'

export default function AddUserStackPopover() {
  return (
    <Popover >
      <PopoverTrigger asChild>
        <Pen size={18} className='mb-1' />
      </PopoverTrigger>
      <PopoverContent side='left'>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Edit stack</h4>
            <p className="text-muted-foreground text-sm">
              List your skills, separating them with commas.
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
