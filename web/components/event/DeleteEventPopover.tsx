import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { useIconSize } from '@/hooks/rwd-hooks/useIconSize'

type PropsType = {
  fn: () => void,
  popoverText: string,
}
export default function DeleteEventPopover({ fn, popoverText }: PropsType) {
  const iconSize = useIconSize()

  return (
    <Popover>
      <PopoverTrigger className='cursor-pointer'><Trash size={iconSize} /></PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-2'>
          <p>{popoverText}</p>
          <Button className='self-end cursor-pointer' onClick={() => fn()}>Delete</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}