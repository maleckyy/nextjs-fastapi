'use client'
import { useGetProfileStackQuery } from '@/api/profile/profileStack/useGetProfileStack';
import { useUpdateProfileStack } from '@/api/profile/profileStack/useUpdateProfileStack';
import AppInputField from '@/components/shared/Inputs/AppInput'
import { createToast } from '@/lib/toastService';
import { updateUserStackSchema } from '@/schemas/profileStack.scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function AddUserStackFormField() {

  type UpdateUserStackSchema = z.infer<typeof updateUserStackSchema>;
  const { data, refetch } = useGetProfileStackQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
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
        createToast("Zapisano nowe umiejętności", "success")
        refetch()
      },
      onError: (e) => {
        createToast("Błąd", "error", e.message)
      }
    })
  }

  return (
    <div className="flex flex-row gap-2 items-center w-full">
      <AppInputField name='stack' control={control} defaultValue={data?.stack} label='Umiejętności' error={errors.stack?.message} noMargin />
      <Save onClick={handleSubmit(updateUserStack)} />
    </div>
  )
}
