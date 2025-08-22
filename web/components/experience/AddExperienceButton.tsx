'use client'
import { useExperienceDialog } from '@/store/experience/ExperienceDialogContext'
import { Plus } from 'lucide-react'
import React from 'react'

export default function AddExperienceButton() {

  const { openDialog } = useExperienceDialog()

  return (
    <button aria-label="Add new experience" onClick={() => openDialog()}><Plus /></button>
  )
}
