import React, { useState } from 'react'
import { AutoTextarea } from '../shared/Inputs/TextareaResize'
import { Button } from '../ui/button'
import { Send } from 'lucide-react'

type PropsType = {
  activeRoomId: string | undefined,
  sendMessage: (text: string) => void,
}

export default function ChatInputBox({ activeRoomId, sendMessage }: PropsType) {
  const [input, setInput] = useState('')

  function submitMessage() {
    sendMessage(input)
    setInput('')
  }

  return (
    <>
      <AutoTextarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            submitMessage()
          }
        }}
        disabled={!activeRoomId}
        minRows={1}
        maxRows={5}
      />
      <Button onClick={submitMessage} disabled={input.trim().length === 0 || !activeRoomId} >
        Send <Send />
      </Button>
    </>
  )
}
