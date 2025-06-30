'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { api } from '@/api/api';
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { LoginOutput } from '@/types/authTypes/login.type';
import { setStringValueToLocalStorage } from '@/store/localStorage';
import ClientRedirect from './ClientRedirect';
import { useAuthStore } from '@/store/authStore';

export default function LoginForm() {
    const [email, onChangeText] = React.useState('test@wp.pl');
    const [password, onChangePass] = React.useState('qwe123');
    const { setToken } = useAuthStore()

    const router = useRouter()

    const loginUser = async (credentials: { email: string; password: string }): Promise<LoginOutput> => {
        const params = new URLSearchParams();
        params.append('username', credentials.email);
        params.append('password', credentials.password);

        const response = await api.post('/auth/token', params, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    };

    const loginMutation = useMutation({
        mutationFn: async()=> await loginUser({email, password}),
        onSuccess: async(response: LoginOutput) => {
            setStringValueToLocalStorage("token", response.access_token)
            setToken(response.access_token)
            router.replace('/dashboard')
        },
        onError: (e) => {
            console.log(e)
        }
    })

    function submitForm() {
        loginMutation.mutate()
    }
    return (
        <section className='flex gap-2 justify-center flex-col'>
            <ClientRedirect/>
            <Input value={email} onChange={(e) => {
                onChangeText(e.target.value)
            }}>
            </Input>
            <Input value={password} type='password' onChange={(e) => {
                onChangePass(e.target.value)
            }}>
            </Input>
            <Button onClick={submitForm}>Zaloguj</Button>
        </section>
    )
}
