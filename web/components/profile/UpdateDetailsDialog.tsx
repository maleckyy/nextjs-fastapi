import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { PenLine } from 'lucide-react'
import { UserDetails } from '@/types/profile/profile.type'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import AppInputField from '../shared/Inputs/AppInput'
import { useUpdateUserDetails } from '@/api/profile/useUpdateUserDetails'
import { createToast } from '@/lib/toastService'
import { updateUserDetailsSchema } from '@/schemas/userDetails.schema'
type PropsType = {
  userDetails: UserDetails,
  refetch: () => void
}

export default function UpdateDetailsDialog({ userDetails, refetch }: PropsType) {
  const [open, setOpen] = React.useState(false);

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
    reset({
      address: userDetails.address,
      country: userDetails.country,
      description: userDetails.description,
      phone_number: userDetails.phone_number
    })
  }

  const useUpdateUserDetailsMutation = useUpdateUserDetails()

  function updateUserDetails(formData: UpdateUserDetailsFormType) {
    useUpdateUserDetailsMutation.mutate(formData, {
      onSuccess: () => {
        refetch()
        createToast("Zaktualizowano dane!", "success")
        resetFormToDefaults()
        setOpen(false)
      },
      onError: (e) => {
        createToast("Coś poszło nie tak", "error", e.message)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(value: boolean) => {
      setOpen(value)
      resetFormToDefaults()
    }}>
      <DialogTrigger asChild>
        <PenLine className='mt-2 cursor-pointer' size={18} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edytuj profil</DialogTitle>
          <DialogDescription>
            Wprowadz zmiany do swojego profilu.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-0'>
          <AppInputField control={control} name='address' label='Adres' error={errors.address?.message} defaultInputValue={userDetails.address} showLabel />
          <AppInputField control={control} name='country' label='Kraj' error={errors.country?.message} defaultInputValue={userDetails.country} showLabel />
          <AppInputField control={control} name='description' label='Opis profilu' error={errors.description?.message} defaultInputValue={userDetails.description} showLabel type="textarea" />
          <AppInputField control={control} name='phone_number' label='Numer telefonu' error={errors.phone_number?.message} defaultInputValue={userDetails.phone_number} showLabel />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={resetFormToDefaults}>Anuluj</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting || !isDirty} onClick={handleSubmit(updateUserDetails)}>Zapisz zmiany</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}
