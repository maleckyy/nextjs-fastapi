'use client'
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { LoginFormType, LoginOutput } from '@/types/authTypes/login.type';
import { setStringValueToLocalStorage } from '@/store/localStorage';
import { useAuthStore } from '@/store/authStore';
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/schemas/login.schema';
import { useLoginMutation } from '@/api/auth/login/useLoginMutation';
import AppInputField from '../shared/Inputs/AppInput';
import Link from 'next/link';
import { createToast } from '@/lib/toastService';
import { createTokenCookie } from '@/actions/actions';
import { ActiveUserContext } from '@/store/activeUserContext';
import AnimatedSpinner from '../shared/AnimatedSpinner';

export default function LoginForm() {
  const { setDetails } = useAuthStore()
  const router = useRouter()
  const { refetchOnLogin } = useContext(ActiveUserContext)
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const submitForm = (data: LoginFormType) => {
    setIsLoading(true)
    loginMutation.mutate({ email: data.username, password: data.password }, {
      onSuccess: async (response: LoginOutput) => {
        createToast("Logged in successfully", "success")
        setStringValueToLocalStorage("token", response.access_token)
        setStringValueToLocalStorage("token_expire_datetime", response.expire_datetime)
        setStringValueToLocalStorage("refresh_token", response.refreshToken)
        setDetails(response.access_token, response.refreshToken, response.expire_datetime)
        createTokenCookie(response.access_token, response.token_expires_time)
        refetchOnLogin()
        router.push('/dashboard')
        reset()
        setIsLoading(false)
      },
      onError: (e) => {
        console.log(e)
        createToast("Error", "error")
        setIsLoading(false)
      }
    });
  };

  return (
    <section className='flex gap-2 justify-center flex-col'>
      <AppInputField name='username' control={control} label="Email" error={errors.username?.message} />
      <AppInputField name='password' control={control} label="Password" error={errors.password?.message} type='password' />
      <Button onClick={handleSubmit(submitForm)} disabled={isSubmitting}>{!isLoading ? ("Log in") : (<AnimatedSpinner />)}</Button>
      <Link href='/register' className='text-gray-400 text-center'>Don&apos;t have an account? Sign up</Link>
    </section>
  )
}
