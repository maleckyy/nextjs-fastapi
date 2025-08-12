import { cn } from '@/lib/utils'
import { AiMessage } from '@/types/agentAi/agent.type'
import React from 'react'

type PropsType = {
  message: AiMessage
}

function ChatMessage({ message }: PropsType) {
  return (
    <div className={cn("flex flex-row", message.messageType === 1 && "justify-end")}>
      <p className={cn(message.messageType === 1 && "bg-secondary rounded-xl   max-w-[70%]", "whitespace-pre-wrap py-2 px-3 text-sm")}>{message.content}</p>
    </div>
  )
}

export default React.memo(ChatMessage)