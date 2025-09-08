'use client'
import React from 'react'
import ProjectForm from './ProjectForm'
import { useGlobalDialog } from '@/store/globalDialogContext/globalDialog'
import { Plus } from 'lucide-react'

export default function AddProjectButton() {
  const { openDialog } = useGlobalDialog()

  return (
    <button onClick={() => {
      openDialog({
        title: "Add personal project",
        content: <ProjectForm />,
        dataTestId: 'personal-project-dialog'
      })
    }} className='cursor-pointer' data-testid="add-project-button"><Plus /><span className="sr-only">Add project</span></button>
  )
}
