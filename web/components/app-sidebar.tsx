import { House, NotebookPen } from 'lucide-react'
import React from 'react'
import LogoutButton from './sidebar/logoutButton'
import { NavOptionsType } from '@/types/navigationTypes/navigation.type'
import SingleNavElement from './sidebar/singleNavElement'
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
  ]
  
  return (
    <div className='p-4 flex flex-col g-4 px-6 bg-gray-800 text-white'>
      <h1 className='text-3xl mb-4 text-inherit text-center'>PSPACe</h1>
      { navOptions.map((item,index) => (
          <SingleNavElement key={index} item={item}/>
        )
      )}
      <div className='mt-auto'>
        <LogoutButton/>
      </div>
    </div>
  )
}
