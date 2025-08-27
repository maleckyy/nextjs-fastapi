'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { createToast } from '@/lib/toastService'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { useGlobalDialog } from '@/store/globalDialogContext/globalDialog'
import { PersonalProject } from '@/types/personalProjects/personalProjects.type'
import { useQueryClient } from '@tanstack/react-query'
import { EllipsisVertical } from 'lucide-react'
import React from 'react'
import ProjectForm from './ProjectForm'
import { useDeletePersonalProject } from '@/api/profilePersonalProjects/useDeletePersonalProject'

export default function TableActionButton({ project }: { project: PersonalProject }) {
  const queryClient = useQueryClient()
  const { openDialog } = useGlobalDialog()
  const deletePersonalProjectMutation = useDeletePersonalProject()

  function deleteProject(id: string) {
    deletePersonalProjectMutation.mutate(id, {
      onSuccess: () => {
        createToast("Project deleted", "info")
        queryClient.invalidateQueries({ queryKey: [QueryKeys.PROFILE_PERSONAL_PROJECTS] })
      }
    })
  }

  function editProject(project: PersonalProject) {
    openDialog({
      title: "Update project",
      content: <ProjectForm project={project} />,
      dataTestId: 'personal-project-dialog'
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <button aria-label='Row action button'>
          <EllipsisVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='left'>
        <DropdownMenuItem onClick={() => editProject(project)}>
          <div>Edit</div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => deleteProject(project.id)}>
          <div>Delete</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
