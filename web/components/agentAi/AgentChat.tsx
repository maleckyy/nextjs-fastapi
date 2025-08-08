'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import AnimatedSpinner from '../shared/AnimatedSpinner'
import { createToast } from '@/lib/toastService'
import { AutoTextarea } from '../shared/Inputs/TextareaResize'
import EmptyDataBox from '../shared/EmptyDataBox'
import { useSendMessage } from '@/api/agentAi/useSendQuestionToAi'
import { AgentAiAnwser, AgentAiQuestion, AiMessage } from '@/types/agentAi/agent.type'
import { useAgentChatStore } from '@/store/agentAiStore/useAgentChatStore'
import ChatMessage from './ChatMessage'

export default function AgentChat() {

  const storeMessages = useAgentChatStore((state) => state.messages)
  const addMessage = useAgentChatStore((state) => state.addMessage)
  // temporarily on zustand store

  const [question, setQuestion] = useState<string>('')
  const [messages, setMessages] = useState<AiMessage[]>(storeMessages)
  const [loadingAnwser, setLoadingAnwser] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sendMessageMutation = useSendMessage()

  function addToMessageList(data: AgentAiAnwser | AgentAiQuestion) {
    if ('answer' in data) {
      const newListItem: AiMessage = {
        content: data.answer,
        messageType: "answer"
      }
      setMessages(prevVal => [...prevVal, newListItem])
      addMessage(newListItem)
    } else {
      const newListItem: AiMessage = {
        content: data.question,
        messageType: "question"
      }
      setMessages(prevVal => [...prevVal, newListItem])
      addMessage(newListItem)
    }
  }

  function handleSubmit() {
    if (question.trim() !== '') {
      setLoadingAnwser(true)
      const userQuestionData = { question: question.trim() }
      addToMessageList(userQuestionData)
      setQuestion('')

      sendMessageMutation.mutate(userQuestionData, {
        onSuccess: (data) => {
          setLoadingAnwser(false)
          addToMessageList(data)
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

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingAnwser]);


  return (
    <div className='flex flex-col justify-start h-full min-h-0'>

      <div className='overflow-y-auto min-h-0 flex flex-col h-full flex-1 scroll-smooth' ref={scrollContainerRef}>
        {messages.length > 0 &&
          messages.map((message, index) => {
            return (<ChatMessage key={index} message={message} />
            )
          })
        }
        {messages.length == 0 && <EmptyDataBox emptyDataText='No chat history' />}
        {loadingAnwser && <AnimatedSpinner />}

        <div ref={messagesEndRef} />
      </div>

      <div className='flex flex-row gap-2 mt-auto justify-center pt-2 justify-self-end'>
        <AutoTextarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          minRows={1}
          maxRows={5}
          className='max-w-[500px]'
        />
        <Button onClick={handleSubmit}>Ask AI</Button>
      </div>

    </div>
  )
}

