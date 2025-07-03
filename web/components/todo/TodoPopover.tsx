import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

type PropsType ={
    iconNode: React.ReactNode,
    fn: () => void,
    popoverText: string,
}
export default function TodoPopover({iconNode, fn, popoverText}: PropsType) {
    return (
        <Popover>
            <PopoverTrigger>{iconNode}</PopoverTrigger>
            <PopoverContent>
                <div className='flex flex-col gap-2'>
                    <p>{popoverText}</p>
                    <Button className='self-end' onClick={()=>fn()}>Usuń</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
  }

