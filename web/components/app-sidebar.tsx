import { BotMessageSquare, CalendarDays, DollarSign, House, MessageCircle, NotebookPen, SidebarClose, User } from 'lucide-react'
import React from 'react'
import { NavOptionsType } from '@/types/navigationTypes/navigation.type'
import SingleNavElement from './sidebar/singleNavElement'
import SidebarOptionsButton from './sidebar/SidebarOptionsButton'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarTrigger } from './ui/sidebar'
import CustomSidebarHeader from './sidebar/SidebarHeader'

export const navOptions: NavOptionsType[] = [
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
    title: "Calendar",
    path: "/events",
    iconNode: <CalendarDays />
  },
  {
    title: "Profile",
    path: "/profile",
    iconNode: <User />
  },
  {
    title: "Finance",
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

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className='flex flex-row justify-between md:justify-start items-center pt-4'>
        <CustomSidebarHeader />
        <SidebarTrigger className='block md:hidden'><SidebarClose /></SidebarTrigger>
      </SidebarHeader>
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