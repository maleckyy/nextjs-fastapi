import { CalendarDays, House, NotebookPen, User } from 'lucide-react'
import React from 'react'
import { NavOptionsType } from '@/types/navigationTypes/navigation.type'
import SingleNavElement from './sidebar/singleNavElement'
import SidebarOptionsButton from './sidebar/SidebarOptionsButton'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu } from './ui/sidebar'

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

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
    {
      title: "Profil",
      path: "/profile",
      iconNode: <User />
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader><div className="text-base px-2 font-semibold pt-4">PSPACE</div></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {navOptions.map((item, index) => (
                <SingleNavElement key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='pb-4'>
        <SidebarOptionsButton />
      </SidebarFooter>
    </Sidebar>
  )
}