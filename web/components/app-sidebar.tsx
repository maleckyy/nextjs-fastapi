import { CalendarDays, House, NotebookPen } from 'lucide-react'
import React from 'react'
import { NavOptionsType } from '@/types/navigationTypes/navigation.type'
import SingleNavElement from './sidebar/singleNavElement'
import SidebarOptionsButton from './sidebar/SidebarOptionsButton'
export default function AppSidebar() {

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
    {
      title: "Wydarzenia",
      path: "/events",
      iconNode: <CalendarDays />
    },
  ]

  return (
    <div className='p-4 flex flex-row justify-between items-center g-4 px-6 bg-gray-800 text-white md:flex-col'>
      <h1 className='text-1xl mb-0 md:mb-4 text-inherit text-center md:text-3xl sm:text-2xl'>PSPACe</h1>
      <div className='flex flex-row md:flex-col gap-4 md:gap-2'>
        {navOptions.map((item, index) =>
          (<SingleNavElement key={index} item={item} />)
        )}
      </div>
      <div className='mt-0 items-center justify-center md:mt-auto md:w-full'>
        <SidebarOptionsButton />
      </div>
    </div>
  )
}
