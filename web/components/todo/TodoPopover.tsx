import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

type PropsType = {
  iconNode: React.ReactNode,
  fn: () => void,
  popoverText: string,
}
export default function TodoPopover({ iconNode, fn, popoverText }: PropsType) {
  return (
    <Popover>
      <PopoverTrigger className='cursor-pointer' data-testid="delete-todo-popover-button">{iconNode}</PopoverTrigger>
      <PopoverContent data-testid="delete-todo-popover-content">
        <div className='flex flex-col gap-2'>
          <p>{popoverText}</p>
          <Button className='self-end cursor-pointer' onClick={() => fn()} data-testid="delete-todo-button">Delete</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

