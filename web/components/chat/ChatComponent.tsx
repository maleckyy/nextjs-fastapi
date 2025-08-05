'use client'
import React, { useCallback } from 'react'
import { ActiveUserContext } from '@/store/activeUserContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useChatContext } from '@/store/chatContext/ActiveChatContext';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/api/axios';
import { Button } from '../ui/button';
import { ChatMessage } from '@/types/chat/chat.type';
import SingleMessage from './SingleMessage';
import { Send } from 'lucide-react';
import ChatHeader from './ChatHeader';
import EmptyDataBox from '../shared/EmptyDataBox';
import { AutoTextarea } from '../shared/Inputs/TextareaResize';

export default function ChatComponent() {
  const { activeRoomId } = useChatContext()
  const { activeUser } = useContext(ActiveUserContext)
  const currentUserId = activeUser?.id
  const token = useAuthStore().token

  const scrollRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const ws = useRef<WebSocket | null>(null)

  const getLastMessages = useCallback(async () => {
    const response = await api.get(`/chat/messages/${activeRoomId}`)
    setMessages(response.data)
  }, [activeRoomId])

  useEffect(() => {
    if (!activeRoomId) return;
    setMessages([])
    getLastMessages()
  }, [activeRoomId, getLastMessages])

  useEffect(() => {
    if (!activeUser || !activeRoomId || !token) return;

    ws.current = new WebSocket(`ws://localhost:8000/chat?client_id=${activeUser?.id}&room_id=${activeRoomId}&token=${token}`)
    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)])
    }

    return () => {
      ws.current?.close()
    }
  }, [activeUser, activeRoomId, token])

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN && input) {
      const inputOutput = input.trim()
      if (inputOutput !== '') {
        ws.current.send(input.trim())
        setInput('')
      }
    }
  }

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="w-full h-full flex flex-col justify-start gap-4 min-h-0">
      <ChatHeader />

      <div className='overflow-y-auto min-h-0 flex flex-col h-full flex-1 gap-2' ref={scrollRef}>
        {messages.length !== 0 && messages.map((msg, idx) => (
          <SingleMessage message={msg} key={idx} currentUserId={currentUserId} />
        ))}
        {messages.length === 0 && <EmptyDataBox emptyDataText='Brak historii czatu' />}
      </div>

      <div className='flex flex-row gap-4 items-end '>
        <AutoTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          disabled={!activeRoomId}
          minRows={1}
          maxRows={5}
        />
        <Button onClick={sendMessage} disabled={input.trim().length === 0 || !activeRoomId} >
          Wyślij <Send />
        </Button>
      </div>
    </div>
  )
}

