'use client'
import { registerSchema } from '@/schemas/register.schema';
import { RegisterFormType } from '@/types/authTypes/login.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import AppInputField from '../shared/Inputs/AppInput';
import { Button } from '../ui/button';
import Link from 'next/link';
import z from 'zod';
import { useRegisterUser } from '@/api/auth/register/useRegisterUser';
import { createToast } from '@/lib/toastService';

export default function RegisterForm() {

  const router = useRouter()
  type CreateUserFormType = z.infer<typeof registerSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormType>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useRegisterUser()

  function submitForm(data: CreateUserFormType) {

    const user: RegisterFormType = {
      username: data.username,
      email: data.email,
      password: data.password
    }

    mutate(user, {
      onSuccess: () => {
        createToast("Utworzono konto", "success")
        router.push('/login')
      },
      onError: () => {
        createToast("Błąd", "error")
      }
    })
  }

  return (
    <section className='flex gap-0 justify-center flex-col'>
      <AppInputField name='username' control={control} label="Nazwa użytkownika" error={errors.username?.message} showLabel />
      <AppInputField name='email' control={control} label="Email" error={errors.email?.message} showLabel />
      <AppInputField name='password' control={control} label="Hasło" error={errors.password?.message} type='password' showLabel />
      <AppInputField name='confirmPassword' control={control} label="Powtórz hasło" error={errors.confirmPassword?.message} type='password' showLabel />
      <Button onClick={handleSubmit(submitForm)} disabled={isSubmitting}>{!isPending ? 'Rejestruj' : 'Rejestrowanie...'}</Button>
      <Link href='/login' className='text-gray-400 text-center mt-2'>Masz konto? Zaloguj się!</Link>
    </section>
  )
}
