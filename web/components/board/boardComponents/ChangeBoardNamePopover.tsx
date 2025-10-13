import React, { useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Pen } from 'lucide-react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'

type PropsType = {
  changeBoardName: (newName: string) => void
  boardName: string
}

export default function ChangeBoardNamePopover({ changeBoardName, boardName }: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null)
  function changeName() {
    if (inputRef.current) {
      if (inputRef.current.value.trim() !== "") {
        changeBoardName(inputRef.current.value)
      }
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='cursor-pointer'>
          <Pen size={16} />
          <span className='sr-only'>Edit board name</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-80 flex gap-2">
        <Input placeholder='Board name' defaultValue={boardName} ref={inputRef} />
        <Button onClick={changeName}>Save</Button>
      </PopoverContent>
    </Popover>
  )
}
