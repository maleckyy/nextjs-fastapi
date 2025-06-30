import { House, NotebookPen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './sidebar/logoutButton'
export default function AppSidebar() {

  type NavOptionsType = {
    title: string,
    path: string,
    iconNode: React.ReactNode
  }

  const navOptions: NavOptionsType[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      iconNode: <House />
    },
    {
      title: "Todo",
      path: "/todo",
      iconNode: <NotebookPen />
    },
  ]


  return (
    <div className='p-4 flex flex-col g-4 px-6 bg-gray-800 text-white'>
      <h1 className='text-3xl mb-4 text-inherit text-center'>PSPACe</h1>
      { navOptions.map((item) => (
          <Link href={item.path} key={item.title} className='flex flex-row gap-2 items-center justify-start mb-2'>
            {item.iconNode}
            <div className='text-[18px] mt-1 text-inherit'>{item.title}</div>
          </Link>
        )
      )}
      <div className='mt-auto'>

      <LogoutButton/>
      </div>
    </div>
    // <SidebarTrigger />
  )
}
