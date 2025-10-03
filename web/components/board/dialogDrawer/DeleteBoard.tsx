import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Trash } from 'lucide-react'
import React from 'react'

type PropsType = {
  deleteFn: () => void
}
export default function DeleteBoard({ deleteFn }: PropsType) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <Trash size={16} /><span className="sr-only">Delete board</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 flex flex-col gap-2">
          <p>Are you sure you want to delete this?</p>
          <div className='flex justify-end'>
            <Button onClick={deleteFn}>Delete</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
