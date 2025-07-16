import { Todo } from '@/types/todo/todo.type'
import React from 'react'

type Props = {
  todo: Todo;
};

export default function SingleCardElement({ todo }: Props) {
  return (
    <div className='flex gap-2'>
      <h4 className='text-base text-accent-foreground'>{todo.title}</h4>
    </div>
  )
}
