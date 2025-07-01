'use client'
import { clearLocalStorageData } from '@/store/localStorage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '@/store/authStore'

export default function LogoutButton() {
    const router = useRouter()
    const {clearToken} = useAuthStore()
    function logoutUser() {
        clearLocalStorageData()
        clearToken()
        router.push("/login")
    }

    return (
        <Button onClick={logoutUser} className='w-full'>Logout</Button>
    )
}
