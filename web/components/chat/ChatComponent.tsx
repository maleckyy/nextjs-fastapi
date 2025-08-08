'use client'
import React, { useCallback } from 'react'
import { ActiveUserContext } from '@/store/activeUserContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useChatContext } from '@/store/chatContext/ActiveChatContext';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/api/axios';
import { ChatMessage } from '@/types/chat/chat.type';
import SingleMessage from './SingleMessage';
import ChatHeader from './ChatHeader';
import EmptyDataBox from '../shared/EmptyDataBox';
import ChatInputBox from './ChatInputBox';
import { WEBSOCKET_URL } from '@/env/API_URL';

export default function ChatComponent() {
  const { activeRoomId, clientTargetId } = useChatContext()
  const { activeUser } = useContext(ActiveUserContext)
  const currentUserId = activeUser?.id
  const token = useAuthStore().token

  const scrollRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
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

    ws.current = new WebSocket(`${WEBSOCKET_URL}?client_id=${activeUser?.id}&room_id=${activeRoomId}&token=${token}`)
    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)])
    }

    return () => {
      ws.current?.close()
    }
  }, [activeUser, activeRoomId, token])

  const sendMessage = (input: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN && input) {
      const inputOutput = input.trim()
      if (inputOutput !== '') {
        ws.current.send(input.trim())
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
      {clientTargetId && <ChatHeader />}

      <div className='overflow-y-auto min-h-0 flex flex-col h-full flex-1 gap-2' ref={scrollRef}>
        {messages.length !== 0 && messages.map((msg) => (
          <SingleMessage message={msg} key={msg.message_id} currentUserId={currentUserId} />
        ))}
        {messages.length === 0 && <EmptyDataBox emptyDataText='No chat history' />}
      </div>

      <div className='flex flex-row gap-4 items-end '>
        <ChatInputBox activeRoomId={activeRoomId} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

