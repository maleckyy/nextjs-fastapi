'use client'
import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import SingleTodo from './SingleTodo'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { getLastTodo } from '@/api/dashboard/getLastTodo'

export default function LastTodoCard() {

  const {data, isLoading} = useQuery({
    queryKey:[QueryKeys.LAST_TODOS],
    queryFn: getLastTodo,
  })

  return (
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
  )
}
