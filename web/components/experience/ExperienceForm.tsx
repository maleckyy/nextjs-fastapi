import { ExperienceFormType, profileExperienceSchema } from '@/schemas/experience.schema'
import { ExperienceOut } from '@/types/experience/experience.type'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AppInputField from '../shared/Inputs/AppInput'
import AppDatePicker from '../shared/Inputs/AppDatePicker'
import { Button } from '../ui/button'
import { useAddNewExperience } from '@/api/experience/useAddNewExperience'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { createToast } from '@/lib/toastService'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { useExperienceDialog } from '@/store/experience/ExperienceDialogContext'
import { useUpdateExperience } from '@/api/experience/useUpdateExperience'
import { updateExperienceParamsType } from '@/api/experience/updateExperience'

type PropsType = {
  experienceData: ExperienceOut | undefined
}
export default function ExperienceForm({ experienceData }: PropsType) {
  const [switchValue, setSwitchValue] = useState(() => {
    if (experienceData?.ending_date === null) return false
    else return true
  })
  const formSchema = profileExperienceSchema
  const queryClient = useQueryClient()
  const { closeDialog } = useExperienceDialog()
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ExperienceFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: experienceData?.position,
      description: experienceData?.description,
      starting_date: experienceData?.starting_date ? new Date(experienceData?.starting_date) : new Date(),
      ending_date: experienceData?.ending_date ? new Date(experienceData?.ending_date) : new Date(),
    }
  });

  function cleanupAfterMutation() {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.PROFILE_EXPERIENCE] })
    closeDialog()
    reset()
  }

  const useAddNewExperienceMutation = useAddNewExperience()
  const useUpdateExperienceMutation = useUpdateExperience()

  function handleSubmitAction(formData: ExperienceFormType) {
    const newExperienceData: ExperienceFormType = {
      ...formData,
      ending_date: !switchValue ? undefined : formData.ending_date
    }

    if (experienceData) {
      const updateData: updateExperienceParamsType = {
        experienceId: experienceData.id,
        experienceData: newExperienceData
      }

      useUpdateExperienceMutation.mutate(updateData, {
        onSuccess: () => {
          createToast("Experience updated", "success")
          cleanupAfterMutation()
        }, onError: (e) => {
          createToast("Error", "error", e.message)
        }
      })
    } else {
      useAddNewExperienceMutation.mutate(newExperienceData, {
        onSuccess: () => {
          createToast("Experience created", "success")
          cleanupAfterMutation()
        }, onError: (e) => {
          createToast("Error", "error", e.message)
        }
      })
    }

  }

  return (
    <div className="flex flex-col">
      <AppInputField name='position' control={control} defaultInputValue={experienceData?.position} label='Role' error={errors.position?.message} />
      <AppInputField name='description' type='textarea' control={control} defaultInputValue={experienceData?.description} label='Description / Responsibilities' error={errors.description?.message} />

      <div>
        <Label className='mb-2'>Start date</Label>
        <AppDatePicker control={control} name='starting_date' label='s' error={errors.starting_date?.message} />
      </div>

      <Label className='mb-2'>Employment terminated?</Label>
      <div className="flex gap-2 items-center">
        <div className="flex items-center space-x-2">
          <Switch id="experienceEndDate" checked={switchValue} onCheckedChange={setSwitchValue} />
          <Label htmlFor="experienceEndDate"></Label>
        </div>
        <AppDatePicker className="w-full" control={control} name='ending_date' label='s' error={errors.ending_date?.message} noMargin isDisabled={!switchValue} />
      </div>

      <div className='flex justify-end mt-[16px]'>
        <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleSubmitAction)} disabled={isSubmitting || !isDirty}>{experienceData ? ("Update ") : ("Add ")}</Button>
      </div>
    </div>
  )
}
