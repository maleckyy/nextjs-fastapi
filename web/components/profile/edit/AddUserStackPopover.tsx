import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Pen } from 'lucide-react'
import React from 'react'
import AddUserStackFormField from './AddUserStackFormField'

export default function AddUserStackPopover() {
  return (
    <Popover >
      <PopoverTrigger asChild>
        <Pen size={18} className='mb-2' />
      </PopoverTrigger>
      <PopoverContent side='left' className='max-w-[400px]'>
        <div className="flex flex-col justify-start items-start gap-2">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Edit stack</h4>
            <p className="text-muted-foreground text-sm">
              List your skills, separating them with commas.
            </p>
          </div>
          <AddUserStackFormField />
        </div>
      </PopoverContent>
    </Popover>
  )
}
