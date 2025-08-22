import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { ExperienceOut } from '@/types/experience/experience.type'
import DeleteExperienceButton from './DeleteExperienceButton'
import UpdateExperienceButton from './UpdateExperienceButton'

type PropsType = {
  experienceItem: ExperienceOut,
}

export default function ExperienceTableActionMenu({ experienceItem }: PropsType) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <button aria-label='Row action button'>
          <EllipsisVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='left'>
        <UpdateExperienceButton experience={experienceItem} />
        <DeleteExperienceButton experienceId={experienceItem.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
