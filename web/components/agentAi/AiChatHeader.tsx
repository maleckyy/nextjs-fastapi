import { ChatRoomOutput } from '@/types/agentAi/agent.type'
import { PanelRightOpen } from 'lucide-react'
import React from 'react'

export default function AiChatHeader({ activeChat, openDrawer }: { activeChat: ChatRoomOutput | undefined, openDrawer: () => void }) {
  return (
    <div className='flex flex-row justify-between items-center px-2 pb-2'>
      <div className='flex flex-col'>
        {activeChat && (
          <>
            <span className='extra-small-text-description'>Chat</span>
            <span className='medium-text-title font-medium first-letter:uppercase'>{activeChat?.name}</span>
          </>
        )}
      </div>
      <PanelRightOpen onClick={openDrawer} size={18} className='cursor-pointer' />
    </div>
  )
}
