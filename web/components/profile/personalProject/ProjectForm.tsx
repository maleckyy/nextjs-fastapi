'use client'
import { useCreateNewProject } from '@/api/profilePersonalProjects/useCreateNewProject'
import AppInputField from '@/components/shared/Inputs/AppInput'
import { Button } from '@/components/ui/button'
import { createToast } from '@/lib/toastService'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { projectFormSchema, projectFormType } from '@/schemas/personalProject.schema'
import { useGlobalDialog } from '@/store/globalDialogContext/globalDialog'
import { PersonalProject } from '@/types/personalProjects/personalProjects.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateProjectData } from './useUpdateProjectData'


type PropsType = {
  project?: PersonalProject
}
export default function ProjectForm({ project }: PropsType) {
  const queryClient = useQueryClient()

  const createNewProjectMutation = useCreateNewProject()
  const updateProjectMutation = useUpdateProjectData()

  const { closeDialog } = useGlobalDialog()

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<projectFormType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || undefined,
      github: project?.github || undefined,
      demoLink: project?.demoLink || undefined,
      projectStack: project?.projectStack || '',
    },
  });

  function afterRequestCleanup() {
    closeDialog()
    reset()
    queryClient.invalidateQueries({ queryKey: [QueryKeys.PROFILE_PERSONAL_PROJECTS] })
  }

  function handleFormSubmit(formData: projectFormType) {
    if (project) {
      updateProjectMutation.mutate({
        id: project.id,
        newProjectData: formData
      }, {
        onSuccess: () => {
          createToast("Project updated", "success")
          afterRequestCleanup()
        }
      })
    } else {
      createNewProjectMutation.mutate(formData, {
        onSuccess: () => {
          createToast("Project created", "success")
          afterRequestCleanup()
        }
      })
    }
  }

  return (
    <div className="flex flex-col">
      <AppInputField
        name="title"
        control={control}
        label="Project name"
        error={errors.title?.message}
      />
      <AppInputField
        name="description"
        type='textarea'
        control={control}
        label="Project description"
        error={errors.description?.message}
      />
      <AppInputField
        name="github"
        control={control}
        label="Github repository url"
        error={errors.github?.message}
      />
      <AppInputField
        name="demoLink"
        control={control}
        label="Live demo url"
        error={errors.demoLink?.message}
      />
      <AppInputField
        name="projectStack"
        type='textarea'
        control={control}
        label="Project stack"
        error={errors.projectStack?.message}
      />
      <div className="flex justify-end">
        <Button
          className="scale-hover cursor-pointer"
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting}
        >
          {project ? "Update" : "Add"}
        </Button>
      </div>
    </div>
  )
}
