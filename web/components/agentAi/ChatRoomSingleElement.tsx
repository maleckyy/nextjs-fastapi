import { cn } from '@/lib/utils'
import { ChatRoomOutput } from '@/types/agentAi/agent.type'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Trash } from 'lucide-react'
import { Button } from '../ui/button'

type PropsType = {
  chat: ChatRoomOutput,
  activeChat: ChatRoomOutput | undefined,
  setActiveChat: (chat: ChatRoomOutput) => void
  deleteChat: (id: string) => void
}

export default function ChatRoomSingleElement({ chat, activeChat, setActiveChat, deleteChat }: PropsType) {
  return (
    <div className={cn('flex flex-row justify-between items-center gap-2  py-2 px-2 -mx-2', activeChat?.id === chat.id && "bg-muted rounded-lg")} key={chat.id}>
      <span className='small-text-title font-medium capitalize cursor-pointer first-letter:uppercase' onClick={() => setActiveChat(chat)}>{chat.name}</span>
      <Popover>
        <PopoverTrigger><Trash size={18} className='cursor-pointer' /></PopoverTrigger>
        <PopoverContent className='flex flex-col gap-2'>
          <div className='cursor-pointer'>
            Do you want to delete this chat?
          </div>
          <Button className='self-end' onClick={() => deleteChat(chat.id)}>Delete</Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
