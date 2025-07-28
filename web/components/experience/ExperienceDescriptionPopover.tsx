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
        <Eye className='cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p>{replaceEmptyString(description, "Brak informacji")}</p>
      </PopoverContent>
    </Popover>
  )
}
