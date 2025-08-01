'use client'

import ProfileAvatar from '@/components/profile/ProfileAvatar';
import { cn } from '@/lib/utils';
import { ActiveUserContext } from '@/store/activeUserContext'
import { useContext, useEffect, useRef, useState } from 'react'

type ChatClient = {
  username: string;
  avatarUrl: string;
  user_id: string;
};

type ChatMessage = {
  client: ChatClient;
  message: string;
};

export default function ChatPage() {

  const { activeUser } = useContext(ActiveUserContext)
  const currentUserId = activeUser?.id


  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/chat?client_id=${activeUser?.id}`)
    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)])
    }

    return () => {
      ws.current?.close()
    }
  }, [activeUser])

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN && input) {
      ws.current.send(input)
      setInput('')
    }
  }
  return (
    <div className="p-4">
      <p className="py-4">ty {activeUser?.username + " | " + activeUser?.id}</p>

      <input
        className="border px-2 py-1 "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button className="ml-2 px-3 py-1 bg-blue-500 text-white mb-2" onClick={sendMessage}>
        Wyślij
      </button>
      <div className="mb-4 mt-2 flex flex-col gap-4">
        {messages.length !== 0 && messages.map((msg, idx) => (
          <div key={idx} className={cn("flex flex-col", currentUserId === msg.client.user_id ? "items-end" : "items-start")}>
            <div className={cn('flex gap-2 items-center',
              currentUserId === msg.client.user_id ? "flex-row-reverse" : "flex-row"
            )}>
              <ProfileAvatar username={msg.client.username} photoPath={msg.client.avatarUrl} widthInPx={30} />
              {msg.message}
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}
