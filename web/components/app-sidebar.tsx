import { BotMessageSquare, CalendarDays, DollarSign, House, MessageCircle, NotebookPen, SidebarClose, User } from 'lucide-react'
import React from 'react'
import { NavOptionsType } from '@/types/navigationTypes/navigation.type'
import SingleNavElement from './sidebar/singleNavElement'
import SidebarOptionsButton from './sidebar/SidebarOptionsButton'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarTrigger } from './ui/sidebar'

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
    {
      title: "Finanse",
      path: "/finance",
      iconNode: <DollarSign />
    },
    {
      title: "Chat",
      path: "/chat",
      iconNode: <MessageCircle />
    },
    {
      title: "Agent AI",
      path: "/agent-ai",
      iconNode: <BotMessageSquare />
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props} data-testid="app-sidebar">
      <SidebarHeader className='flex flex-row justify-between items-center  pt-4'><div className="text-base px-2 font-semibold">PSPACE</div><SidebarTrigger className='block md:hidden'><SidebarClose /></SidebarTrigger></SidebarHeader>
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