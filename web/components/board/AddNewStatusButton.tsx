import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Plus } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type PropsType = {
  addNewStatus: (colName: string) => void
}
export default function AddNewStatusButton({ addNewStatus }: PropsType) {
  const [inputValue, setInputValue] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function onButtonSubmit() {
    addNewStatus(inputValue)
    setInputValue("")
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='cursor-pointer' asChild data-testid="add-task-button"><Button variant={"secondary"} className="bg-gray-50">+ Add new status</Button></PopoverTrigger>
      <PopoverContent>
        <span className='small-text-title'>New status name</span>
        <div className='flex gap-2 mt-2'>
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Status name' className='flex-1' />
          <Button
            onClick={onButtonSubmit}
            disabled={inputValue.trim() === ''}
          >
            <Plus /><span className='sr-only'>Add status</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
// 
