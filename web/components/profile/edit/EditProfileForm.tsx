'use client'
import { useUpdateUserDetails } from '@/api/profile/useUpdateUserDetails';
import AppInputField from '@/components/shared/Inputs/AppInput'
import SectionTitle from '@/components/shared/texts/SectionTitle';
import { Button } from '@/components/ui/button';
import { createToast } from '@/lib/toastService';
import { updateUserDetailsSchema } from '@/schemas/userDetails.schema';
import { ActiveUserContext } from '@/store/activeUserContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function EditProfileForm() {
  const router = useRouter()
  const { activeUser } = useContext(ActiveUserContext)
  const userDetails = activeUser?.details

  type UpdateUserDetailsFormType = z.infer<typeof updateUserDetailsSchema>;

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateUserDetailsFormType>({
    resolver: zodResolver(updateUserDetailsSchema),
  });

  function resetFormToDefaults() {
    if (userDetails) {
      reset({
        address: userDetails.address,
        country: userDetails.country,
        description: userDetails.description,
        phone_number: userDetails.phone_number,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name
      })
    }
  }

  const useUpdateUserDetailsMutation = useUpdateUserDetails()

  function updateUserDetails(formData: UpdateUserDetailsFormType) {
    useUpdateUserDetailsMutation.mutate(formData, {
      onSuccess: () => {
        createToast("Zaktualizowano dane!", "success")
        router.replace('/profile')
        resetFormToDefaults()
      },
      onError: (e) => {
        createToast("Coś poszło nie tak", "error", e.message)
      }
    })
  }

  return (
    <section className='flex flex-col gap-4'>
      <SectionTitle title="Edytuj dane swojego profilu" />

      {userDetails &&
        <div className='flex flex-col gap-0'>
          <div className='flex flex-col md:flex-row w-full gap-4'>
            <AppInputField control={control} name='first_name' label='Imię' error={errors.first_name?.message} defaultInputValue={userDetails.first_name} showLabel />
            <AppInputField control={control} name='last_name' label='Nazwisko' error={errors.last_name?.message} defaultInputValue={userDetails.last_name} showLabel />
          </div>
          <AppInputField control={control} name='description' label='Opis profilu' error={errors.description?.message} defaultInputValue={userDetails.description} showLabel type="textarea" />
          <AppInputField control={control} name='address' label='Adres' error={errors.address?.message} defaultInputValue={userDetails.address} showLabel />
          <AppInputField control={control} name='country' label='Kraj' error={errors.country?.message} defaultInputValue={userDetails.country} showLabel />
          <AppInputField control={control} name='phone_number' label='Numer telefonu' error={errors.phone_number?.message} defaultInputValue={userDetails.phone_number} showLabel />
        </div>
      }
      <div className='flex flex-col-reverse md:flex-row gap-4 justify-end'>
        <Button variant="outline" onClick={resetFormToDefaults}>Anuluj</Button>
        <Button type="submit" disabled={isSubmitting || !isDirty} onClick={handleSubmit(updateUserDetails)}>Zapisz zmiany</Button>
      </div>

    </section>
  )
}
