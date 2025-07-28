import { useExperienceDialog } from '@/store/experience/ExperienceDialogContext'
import { ExperienceOut } from '@/types/experience/experience.type'
import React from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'

type PropsType = {
  experience: ExperienceOut,
}

export default function UpdateExperienceButton({ experience }: PropsType) {
  const { openDialog } = useExperienceDialog()
  return (
    <DropdownMenuItem onClick={() => openDialog(experience)}>
      <div >Edytuj</div>
    </DropdownMenuItem>
  )
}
