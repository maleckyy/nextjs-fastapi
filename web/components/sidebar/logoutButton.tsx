'use client'
import { clearLocalStorageData } from '@/store/localStorage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

export default function LogoutButton() {
    const router = useRouter()
    function logoutUser() {
        // jeszcze z zustanda jak bedzie
        clearLocalStorageData()
        router.push("/login")
    }

    return (
    <Button onClick={logoutUser} className='w-full'>Logout</Button>
    )
}
