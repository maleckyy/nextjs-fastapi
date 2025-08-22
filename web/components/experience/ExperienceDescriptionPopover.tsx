import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Eye } from 'lucide-react'
import { replaceEmptyString } from '@/lib/replaceEmptyString'

type PropsType = {
  description: string | undefined
}

export default function ExperienceDescriptionPopover({ description }: PropsType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='cursor-pointer' aria-label='Preview of the experience description'>
          <Eye />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p>{replaceEmptyString(description, "No data")}</p>
      </PopoverContent>
    </Popover>
  )
}
