import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

type PropsType ={
    fn: () => void,
    popoverText: string,
}
export default function DeleteEventPopover({ fn, popoverText }: PropsType) {
    return (
        <Popover>
            <PopoverTrigger className='cursor-pointer'><Trash/></PopoverTrigger>
            <PopoverContent>
                <div className='flex flex-col gap-2'>
                    <p>{popoverText}</p>
                    <Button className='self-end cursor-pointer' onClick={()=>fn()}>Usuń</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
  }