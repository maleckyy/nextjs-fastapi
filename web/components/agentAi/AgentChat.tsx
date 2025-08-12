'use client'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedSpinner from '../shared/AnimatedSpinner'
import { createToast } from '@/lib/toastService'
import EmptyDataBox from '../shared/EmptyDataBox'
import { useSendMessage } from '@/api/agentAi/useSendQuestionToAi'
import { AiMessage, AskAiPayload } from '@/types/agentAi/agent.type'
import ChatMessage from './ChatMessage'
import { useAiChatDrawerContext } from '@/store/agentAiStore/chatRoomDialogContext'
import { useGetChatMessages } from '@/api/agentAi/useGetChatMessages'
import ChatInputSection from './ChatInputSection'
import AiChatHeader from './AiChatHeader'

export default function AgentChat() {

  const [messages, setMessages] = useState<AiMessage[]>([])
  const [loadingAnwser, setLoadingAnwser] = useState(false)

  const { activeChat, openDrawer, setActiveChat } = useAiChatDrawerContext()
  const askAiMutation = useSendMessage()

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function updateRoomNameOnce(title: string) {
    if (activeChat && activeChat.name === "New chat") {
      const newName = title.slice(0, 50)
      const updatedChat = { ...activeChat, name: newName }
      setActiveChat(updatedChat)
    }
  }

  function handleSubmit(question: string) {
    const questionTrim = question.trim()
    if (questionTrim !== '') {
      setLoadingAnwser(true)
      setMessages((prevVal) => [...prevVal, { content: questionTrim, messageType: 1 }])

      const messagePayload: AskAiPayload = {
        roomId: activeChat!.id,
        question: questionTrim
      }

      askAiMutation.mutate(messagePayload, {
        onSuccess: (data) => {
          setLoadingAnwser(false)
          setMessages((prevVal) => [...prevVal, data])
          updateRoomNameOnce(questionTrim)
        }, onError: (e) => {
          createToast("Errot", "error", e.message)
          setLoadingAnwser(false)
        }
      })
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { data: messageHistory, refetch: refetchMessagehistory } = useGetChatMessages(activeChat)

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingAnwser]);

  useEffect(() => {
    refetchMessagehistory()
    setMessages(messageHistory || [])
  }, [activeChat, refetchMessagehistory, setMessages, messageHistory])

  return (
    <div className='flex flex-col justify-start h-full min-h-0'>
      <AiChatHeader activeChat={activeChat} openDrawer={openDrawer} />
      <div className='overflow-y-auto min-h-0 flex flex-col h-full flex-1 scroll-smooth' ref={scrollContainerRef}>
        {messages && messages.length > 0 &&
          messages.map((message, index) => {
            return (<ChatMessage key={index} message={message} />
            )
          })
        }
        {messages && messages.length == 0 && <EmptyDataBox emptyDataText='No chat history' />}
        {loadingAnwser && <AnimatedSpinner />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInputSection handleSubmit={handleSubmit} />
    </div>
  )
}

