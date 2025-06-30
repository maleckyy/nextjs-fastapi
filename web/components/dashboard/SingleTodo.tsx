import { Todo } from '@/types/authTypes/todo/todo.type'
import React from 'react'

type Props = {
  todo: Todo;
};

export default function SingleTodo({todo}: Props) {
    return (
        <div className='flex gap-2'>
            <h4>{todo.title}</h4>
        </div>
    )
}
