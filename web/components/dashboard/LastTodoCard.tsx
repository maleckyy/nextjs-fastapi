'use client'
import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { useQuery } from '@tanstack/react-query'
import { Todo } from '@/types/authTypes/todo/todo.type'
import { api } from '@/api/api'
import Link from 'next/link'
import SingleTodo from './SingleTodo'
import { QueryKeys } from '@/QueryKeys/queryKeys'

export default function LastTodoCard() {

    async function getLastTodo():Promise<Todo[]> {
        const res = await api.get('/todo')
        console.log(res.data)
        return res.data
    }

    const {data, isLoading} = useQuery({
        queryKey:[QueryKeys.LAST_TODOS],
        queryFn: getLastTodo
    })

  return (
    <>
      <Card className='gap-4 w-full'>
        <CardTitle className='px-6'>Ostatnie zadania</CardTitle>
        <CardContent>
        {isLoading && !data ? (<p>Ładowanie</p>): 
        (
            data!.map((item, index) => {
              return (
                <SingleTodo todo={item} key={index}/>
              )
            })
        )}
        <Link href="/todo" className='text-bold '>Zobacz wszystkie</Link>
        </CardContent>
      </Card>
    </>
  )
}
