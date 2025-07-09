'use client'
import { clearLocalStorageData } from '@/store/localStorage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '@/store/authStore'
import { deleteTokenCookie } from '@/actions/actions'

export default function LogoutButton() {
    const router = useRouter()
    const {clearToken} = useAuthStore()
    
    async function logoutUser() {
        clearLocalStorageData()
        clearToken()
        await deleteTokenCookie()
        router.push("/login")
    }

    return (
        <Button onClick={logoutUser} className='w-full'>Logout</Button>
    )
}
