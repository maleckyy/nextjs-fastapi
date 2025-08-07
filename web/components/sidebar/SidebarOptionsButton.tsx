'use client'
import { clearLocalStorageData } from '@/store/localStorage'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useAuthStore } from '@/store/authStore'
import { deleteTokenCookie } from '@/actions/actions'
import { CircleUserRound, EllipsisVertical, LogOut, Settings, User } from 'lucide-react'
import { createToast } from '@/lib/toastService'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { useManageTheme } from '@/hooks/useManageTheme'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { ActiveUserContext } from '@/store/activeUserContext'
import { SidebarMenuButton, useSidebar } from '../ui/sidebar'

export default function SidebarOptionsButton() {
  const router = useRouter()
  const { clearToken } = useAuthStore()
  const { selectTheme } = useManageTheme()
  const { isMobile, state } = useSidebar()
  const { activeUser, clearData } = useContext(ActiveUserContext)

  async function logoutUser() {
    createToast("Wylogowano", "success")
    clearLocalStorageData()
    clearToken()
    deleteTokenCookie()
    clearData()
    router.push("/login")
  }

  return (
    <div className='w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild data-testid="sidebar-options-dropdown">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className='flex flex-row justify-between w-full items-center'>
              {state === "expanded" ?
                (<>
                  <div className='flex flex-col'>
                    <span className='truncate font-medium'>{activeUser?.username}</span>
                    <span className='text-muted-foreground truncate text-xs'>{activeUser?.email}</span>
                  </div>
                  <EllipsisVertical size={18} />
                </>) :
                (
                  <CircleUserRound className='w-full' />
                )}
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end"
          side={isMobile ? "bottom" : "right"}>
          <DropdownMenuItem asChild className='cursor-pointer' data-testid="options-button">
            <Link href='/settings'>
              Ustawienia
              <DropdownMenuShortcut><Settings /></DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className='cursor-pointer' data-testid="profile-button">
            <Link href='/profile'>
              Profil
              <DropdownMenuShortcut><User /></DropdownMenuShortcut>
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
          <DropdownMenuItem onClick={logoutUser} className='cursor-pointer' data-testid="logout-button">
            Logout
            <DropdownMenuShortcut><LogOut size={22} /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
