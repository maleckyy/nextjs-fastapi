'use client'
import { api } from '@/api/axios';
import { ApiEndpoints } from '@/api/routes/apiEndpoints';
import PageTitle from '@/components/page-title'
import FormatedDate from '@/components/todo/FormatedDate';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { QueryKeys } from '@/QueryKeys/queryKeys';
import type { Todo } from '@/types/authTypes/todo/todo.type';
import { useQuery } from '@tanstack/react-query';
import { Pen, Trash, UnfoldVertical } from 'lucide-react';
import React from 'react'
import CreateTodoDialog from '@/components/todo/TodoCreateDialog';
import TodoPopover from '@/components/todo/TodoPopover';
import { useDeleteTodo } from '@/api/todo/useDeleteTodo';
export default function Todo() {
  async function getEvents() {
    const res = await api.get(ApiEndpoints.TODO_ALL)
    return res.data
  }

  const {data, isLoading, refetch} = useQuery<Todo[]>({
    queryKey: [QueryKeys.EVENTS],
    queryFn: getEvents,
    retryOnMount: false,
    staleTime: 60*1000,
  })

  const useDeleteTodoMutation = useDeleteTodo()

  function changeTodoStatus(item) {
    console.log(item)
  }

  function deleteTodo(item: Todo) {
    console.log(item)
    useDeleteTodoMutation.mutate(item.id, {
      onSuccess: () => {
        refetch()
        // dodac toasty czy inne message
      }
    })

  }

  return (
    <section>
      <PageTitle title="Todos"/>
      {isLoading && <div>ładowanie</div>}
      {!isLoading && <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center"></TableHead>
            <TableHead className="w-[150px]">Nazwa</TableHead>
            <TableHead>Opis</TableHead>
            <TableHead>Data utworzenia</TableHead>
            <TableHead><CreateTodoDialog refetch={refetch}/></TableHead>
          </TableRow>
        </TableHeader>
          <TableBody>
            {isLoading ? ("Ładowanie"):(
              data!.map((item: Todo) =>{ 
                return (<TableRow key={item.id}>
                  <TableCell className='flex justify-center items-center mt-1'><Checkbox checked={item.is_done} onCheckedChange={() => {
                    changeTodoStatus(item)
                  }}/></TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell><FormatedDate date={item.created_at}/></TableCell>
                  <TableCell className="text-center">
                    <div className='flex gap-2 justify-center'>
                      {/* <button className='scale-hover' onClick={() => {
                        changeTodoStatus(item)
                      }}>
                        <Trash/>
                      </button>
                      <button className='scale-hover' onClick={() => {
                        changeTodoStatus(item)
                      }}>
                        <Pen />
                      </button> */}
                      <TodoPopover iconNode={<Trash/>} fn={()=>deleteTodo(item)} popoverText='Czy napewno usunąć ten element?'/>
                    </div>
                  </TableCell>
                </TableRow>)}
              )  
            )}
          </TableBody>
        </Table>
      }
    </section>
  )
}