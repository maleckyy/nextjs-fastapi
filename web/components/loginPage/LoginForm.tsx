'use client'
import { signIn } from "next-auth/react"
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { LoginFormType } from '@/types/authTypes/login.type';
import { clearLocalStorageData } from '@/store/localStorage';
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/schemas/login.schema';
import AppInputField from '../shared/Inputs/AppInput';
import Link from 'next/link';
import { createToast } from '@/lib/toastService';
import { ActiveUserContext } from '@/store/activeUserContext';
import AnimatedSpinner from '../shared/AnimatedSpinner';
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { refetchOnLogin } = useContext(ActiveUserContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const submitForm = async (data: LoginFormType) => {
    setIsLoading(true)
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    })
    if (result.error) {
      setIsLoading(false)
      createToast("User not found", "error")
    } else {
      createToast("Logged in successfully", "success")
      clearLocalStorageData(["loggedOut"])
      refetchOnLogin()
      setIsLoading(false)
      reset()
      router.push("/dashboard")
    }
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
