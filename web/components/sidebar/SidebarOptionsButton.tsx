'use client'
import { clearLocalStorageData, setStringValueToLocalStorage } from '@/store/localStorage'
import React, { useContext } from 'react'
import { useAuthStore } from '@/store/authStore'
import { CircleUserRound, EllipsisVertical, LogOut, Settings, User } from 'lucide-react'
import { createToast } from '@/lib/toastService'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { useManageTheme } from '@/hooks/useManageTheme'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { ActiveUserContext } from '@/store/activeUserContext'
import { SidebarMenuButton, useSidebar } from '../ui/sidebar'
import { useLogoutUser } from '@/api/auth/logout/useLogoutUser'

export default function SidebarOptionsButton() {
  const { clearToken } = useAuthStore()
  const { selectTheme } = useManageTheme()
  const { isMobile, state } = useSidebar()
  const { activeUser, clearData } = useContext(ActiveUserContext)
  const logoutMutation = useLogoutUser()
  function clearClientData() {
    clearLocalStorageData(["accessToken", "refreshToken", "userId"])
    setStringValueToLocalStorage("loggedOut", "1")
    clearToken()
    clearData()
  }
  async function logoutUser() {
    try {
      logoutMutation.mutate()
      const res = await fetch("/api/logout", { method: "POST", cache: "no-store" });
      if (!res.ok) throw new Error("signout failed");
    } catch { }

    try {
      clearClientData()
    } catch (e) {
      console.error("Logout error:", e)
      createToast("Logout failed", "error")
    }

    window.location.href = "/login";
    createToast("Logged out", "success")
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
                    <span className='small-text-title font-medium'>{activeUser?.username}</span>
                    <span className='extra-small-text-description'>{activeUser?.email}</span>
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
              Settings
              <DropdownMenuShortcut><Settings /></DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className='cursor-pointer' data-testid="profile-button">
            <Link href='/profile'>
              Profile
              <DropdownMenuShortcut><User /></DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => {
                    selectTheme("light")
                  }}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    selectTheme("dark")
                  }}>
                    Dark
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
