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
import { Textarea } from '../ui/textarea';
import ChatHeader from './ChatHeader';
import EmptyDataBox from '../shared/EmptyDataBox';
import { ScrollArea } from '../ui/scroll-area';

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
        const epmtyInput = ''
        setInput(epmtyInput.trim())
        const textarea = textareaRef.current;
        if (textarea) textarea.style.height = '36px';
        setTimeout(() => {
          handleMessageHeight();
        }, 10);
      }
    }
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxTextAreaHeight = 100
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '36px';
      const newHeight = Math.min(textarea.scrollHeight, maxTextAreaHeight);
      textarea.style.height = newHeight + 'px';

      if (textarea.scrollHeight > maxTextAreaHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
      if (scrollRef.current) {
        handleMessageHeight()
      }
    }
  };

  function handleMessageHeight() {
    const textarea = textareaRef.current;
    if (textarea) {
      const newHeight = Math.min(textarea.scrollHeight, maxTextAreaHeight);
      if (scrollRef.current) {
        const heightDifference = newHeight - 36;
        scrollRef.current.style.height = `calc(100vh - 184px - ${heightDifference}px)`;
      }
    }
  }

  useEffect(() => {
    const viewport = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]')
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [messages])

  return (
    <div className="w-full h-full flex flex-col justify-start gap-4">
      <ChatHeader />
      {messages.length === 0 && <EmptyDataBox emptyDataText='Brak historii czatu' />}
      {messages.length !== 0 && <ScrollArea className="max-h-[calc(100vh-184px)]" ref={scrollRef}>
        <div className="flex flex-col gap-2 flex-1 justify-end pr-2">
          {messages.length !== 0 && messages.map((msg, idx) => (
            <SingleMessage message={msg} key={idx} currentUserId={currentUserId} />
          ))}
        </div>
      </ScrollArea>}

      <div className='mt-auto flex flex-row gap-4 items-end overflow-hidden'>
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          disabled={!activeRoomId}
          className="resize-none w-full text-area-resize-block overflow-hidden"
          style={{
            minHeight: '36px',
            maxHeight: '128px',
            height: '36px'
          }}
        />
        <Button onClick={sendMessage} disabled={input.trim().length === 0 || !activeRoomId} >
          Wyślij <Send />
        </Button>
      </div>
    </div>
  )
}
