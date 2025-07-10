'use client'
import { clearLocalStorageData } from '@/store/localStorage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '@/store/authStore'
import { deleteTokenCookie } from '@/actions/actions'
import { LogOut } from 'lucide-react'
import { createToast } from '@/lib/toastService'

export default function LogoutButton() {
  const router = useRouter()
  const { clearToken } = useAuthStore()

  async function logoutUser() {
    clearLocalStorageData()
    clearToken()
    deleteTokenCookie()
    createToast("Wylogowano", "success")
    router.push("/login")
  }

  return (
    <Button onClick={logoutUser} className='w-full cursor-pointer'>
      <span className='hidden md:block'>Logout</span>
      <LogOut className='block md:hidden text-bold' size={22} />
    </Button>
  )
}
