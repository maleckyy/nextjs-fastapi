'use client'
import { clearLocalStorageData } from '@/store/localStorage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '@/store/authStore'
import { deleteTokenCookie } from '@/actions/actions'
import { LogOut, Menu, Settings } from 'lucide-react'
import { createToast } from '@/lib/toastService'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { useManageTheme } from '@/hooks/useManageTheme'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'

export default function SidebarOptionsButton() {
  const router = useRouter()
  const { clearToken } = useAuthStore()
  const { selectTheme } = useManageTheme()

  async function logoutUser() {
    createToast("Wylogowano", "success")
    clearLocalStorageData()
    clearToken()
    deleteTokenCookie()
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
              Ustawienia
              <DropdownMenuShortcut><Settings /></DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Motyw</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => {
                    selectTheme("light")
                  }}>
                    Jasny
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    selectTheme("dark")
                  }}>
                    Ciemny
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    selectTheme("system")
                  }}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
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
