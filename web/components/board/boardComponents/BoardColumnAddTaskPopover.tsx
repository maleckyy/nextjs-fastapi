'use client'
import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { CirclePlus, Plus } from 'lucide-react'
import { useBoardViewStore } from '@/store/boardStore/boardViewStore'
import { cn } from '@/lib/utils'

type PropsType = {
  boardId: string,
  columnId: string,
  addTask: (colId: string, boardId: string, title: string) => void,
  onlyText?: boolean
}

export default function BoardColumnAddTaskPopover({ boardId, columnId, addTask, onlyText }: PropsType) {
  const [inputValue, setInputValue] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const listView = useBoardViewStore(state => state.listView)

  function onButtonSubmit() {
    addTask(columnId, boardId, inputValue.trim())
    setInputValue("")
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="w-full cursor-pointer" asChild data-testid="add-task-button">
        {onlyText ? (
          <button className={cn("small-text-title text-center py-2 hover:bg-accent rounded-md", listView && "text-start")}>
            + Add new task
          </button>
        ) : (
          onlyText === undefined &&
          listView && (
            <CirclePlus size={16} className="cursor-pointer" aria-label="Add new task" />
          )
        )}
      </PopoverTrigger>
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
