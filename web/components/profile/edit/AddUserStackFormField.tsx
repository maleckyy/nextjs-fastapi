'use client'
import { useGetProfileStackQuery } from '@/api/profile/profileStack/useGetProfileStack';
import { useUpdateProfileStack } from '@/api/profile/profileStack/useUpdateProfileStack';
import { AutoTextarea } from '@/components/shared/Inputs/TextareaResize';
import { createToast } from '@/lib/toastService';
import { updateUserStackSchema } from '@/schemas/profileStack.scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

export default function AddUserStackFormField() {

  type UpdateUserStackSchema = z.infer<typeof updateUserStackSchema>;
  const { data, refetch } = useGetProfileStackQuery()

  const {
    handleSubmit,
    control,
  } = useForm<UpdateUserStackSchema>({
    resolver: zodResolver(updateUserStackSchema),
    defaultValues: {
      stack: data?.stack
    }
  });

  const updateProfileStackMutatnion = useUpdateProfileStack()
  function updateUserStack(formData: UpdateUserStackSchema) {
    updateProfileStackMutatnion.mutate(formData, {
      onSuccess: () => {
        createToast("New skills saved", "success")
        refetch()
      },
      onError: (e) => {
        createToast("Error", "error", e.message)
      }
    })
  }

  return (
    <div className="flex flex-row gap-4 items-start w-full">
      <Controller
        control={control}
        name="stack"
        defaultValue={data?.stack}
        render={({ field: { onChange, value } }) => {
          return <AutoTextarea value={value} onChange={onChange} className='w-full break-normal' maxRows={5} />
        }}
      />
      <Save onClick={handleSubmit(updateUserStack)} />
    </div>
  )
}
