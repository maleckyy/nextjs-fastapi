'use client'
import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

type PropsType = {
  boardId: string,
  columnId: string,
  addTask: (colId: string, boardId: string, title: string) => void
}

export default function BoardColumnAddTaskPopover({ boardId, columnId, addTask }: PropsType) {
  const [inputValue, setInputValue] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function onButtonSubmit() {
    addTask(columnId, boardId, inputValue.trim())
    setInputValue("")
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='w-full cursor-pointer' asChild data-testid="add-task-button"><button className='small-text-title text-center pt-2'>+ Add new task</button></PopoverTrigger>
      <PopoverContent>
        <span className='small-text-title'>New task name</span>
        <div className='flex gap-2 mt-2'>
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Task title' className='flex-1' />
          <Button
            onClick={onButtonSubmit}
            disabled={inputValue.trim() === ''}
          >
            <Plus /><span className='sr-only'>Add task</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
