'use client'
import { useUpdateUserAccount } from '@/api/auth/user/useUpdateUserAccount';
import AppInputField from '@/components/shared/Inputs/AppInput'
import { Button } from '@/components/ui/button'
import { createToast } from '@/lib/toastService';
import { updateUserAccountSchema } from '@/schemas/updateUserAccount.schema';
import { ActiveUserContext } from '@/store/activeUserContext';
import { UpdateUserAccount } from '@/types/authTypes/login.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function UpdateProfileUserForm() {

  type UpdateUserForm = z.infer<typeof updateUserAccountSchema>;
  const { activeUser, refetchOnLogin } = useContext(ActiveUserContext)

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserAccountSchema),
    defaultValues: {
      username: activeUser?.username,
      email: activeUser?.email
    }
  });

  const updateUserAccountMutation = useUpdateUserAccount()
  function submitForm(formData: UpdateUserForm) {
    const newUserAccountData: UpdateUserAccount = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }

    updateUserAccountMutation.mutate(newUserAccountData, {
      onSuccess: () => {
        refetchOnLogin()
        createToast("Data updated correctly", "success")
      },
      onError: (e) => {
        createToast("Error", "error", e.message)
      }
    })
  }

  return (
    <div>
      <form>
        <div className='flex flex-col md:flex-row md:gap-4 gap-0'>
          <AppInputField name='username' control={control} label="Username" error={errors.username?.message} showLabel />
          <AppInputField name='email' control={control} label="Email" error={errors.email?.message} showLabel />
        </div>
        <div className='flex flex-col md:flex-row md:gap-4 gap-0'>
          <AppInputField name='password' control={control} label="New password" error={errors.password?.message} type='password' showLabel />
          <AppInputField name='confirmPassword' control={control} label="Repeat new password" error={errors.confirmPassword?.message} type='password' showLabel />
        </div>
        <div className='flex justify-end'>
          <Button onClick={handleSubmit(submitForm)} disabled={isSubmitting || !isDirty}>Save</Button>
        </div>
      </form>
    </div>
  )
}
