'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { LoginFormType, LoginOutput } from '@/types/authTypes/login.type';
import { setStringValueToLocalStorage } from '@/store/localStorage';
import ClientRedirect from './ClientRedirect';
import { useAuthStore } from '@/store/authStore';
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/schemas/login.schema';
import { useLoginMutation } from '@/api/auth/login/useLoginMutation';
import AppInputField from './LoginInputs/LoginInput';
import { createTokenCookie } from '@/actions/actions';

export default function LoginForm() {
    const { setDetails } = useAuthStore()
    const router = useRouter()

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
        loginMutation.mutate({ email: data.username, password: data.password },{
            onSuccess: (response: LoginOutput) => {
                setStringValueToLocalStorage("token", response.access_token)
                setStringValueToLocalStorage("token_expire_datetime", response.expire_datetime)
                setDetails(response.access_token, response.refreshToken, response.expire_datetime)
                createTokenCookie(response.access_token)
                router.replace('/dashboard')
                reset()
            },
            onError: (e) => {
                console.log(e)
            }
        });
    };

    return (
        <section className='flex gap-2 justify-center flex-col'>
            <ClientRedirect/>
            <AppInputField name='username' control={control} label="Email" error={errors.username?.message}/>
            <AppInputField name='password' control={control} label="Hasło" error={errors.password?.message} type='password'/>
            <Button onClick={handleSubmit(submitForm)} disabled={isSubmitting}>Zaloguj</Button>
        </section>
    )
}
