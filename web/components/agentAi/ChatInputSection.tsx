import React, { useState } from 'react'
import { AutoTextarea } from '../shared/Inputs/TextareaResize'
import { Button } from '../ui/button'

export default function ChatInputSection({ handleSubmit }: { handleSubmit: (question: string) => void }) {
  const [question, setQuestion] = useState<string>('')

  function submitQuestion() {
    handleSubmit(question)
    setQuestion('')
  }

  return (
    <div className='flex md:flex-row flex-col gap-2 mt-auto justify-center pt-2 justify-self-end'>
      <AutoTextarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            submitQuestion()
          }
        }}
        minRows={1}
        maxRows={5}
        className='md:max-w-[500px] w-full'
      />
      <Button onClick={submitQuestion} className='h-[38]'>Ask AI</Button>
    </div>
  )
}
