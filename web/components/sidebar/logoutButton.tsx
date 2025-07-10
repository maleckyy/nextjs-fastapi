'use client'
import { clearLocalStorageData } from '@/store/localStorage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '@/store/authStore'
import { deleteTokenCookie } from '@/actions/actions'
import { LogOut, Menu, Settings } from 'lucide-react'
import { createToast } from '@/lib/toastService'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'

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
    <div className='w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='w-full cursor-pointer'>
            <span className='hidden sm:block'>Opcje</span>
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/settings'>
              Settings
              <DropdownMenuShortcut><Settings /></DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logoutUser} className='cursor-pointer'>
            Logout
            <DropdownMenuShortcut><LogOut size={22} /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
