'use client'
import { api } from '@/api/axios';
import { ApiEndpoints } from '@/api/routes/apiEndpoints';
import PageTitle from '@/components/page-title'
import FormatedDate from '@/components/todo/FormatedDate';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { QueryKeys } from '@/QueryKeys/queryKeys';
import type { Todo, TodoUpdate } from '@/types/authTypes/todo/todo.type';
import { useQuery } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import React from 'react'
import CreateTodoDialog from '@/components/todo/TodoCreateDialog';
import TodoPopover from '@/components/todo/TodoPopover';
import { useDeleteTodo } from '@/api/todo/useDeleteTodo';
import UpdateTodoDialog from '@/components/todo/TodoUpdateDialog';
import { useUpdateMutatnion } from '@/api/todo/useUpdateTodo';
export default function TodoPage() {
  async function getEvents() {
    const res = await api.get(ApiEndpoints.TODO_ALL)
    return res.data
  }

  const {data, isLoading, refetch} = useQuery<Todo[]>({
    queryKey: [QueryKeys.EVENTS],
    queryFn: getEvents,
    retryOnMount: false,
    staleTime: 60*1000,
    select: (data) =>
      [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
  })

  const useUpdateTodoMutation = useUpdateMutatnion()
  function changeTodoStatus(item: Todo) {
    const updatedTodo: TodoUpdate = {
      id: item.id,
      newTodo: {
        title: item.title,
        description: item.description,
        is_done: !item.is_done
      }
    }

    useUpdateTodoMutation.mutate(updatedTodo, {
      onSuccess: () => {
        refetch()
      }
    })

  }
  
  const useDeleteTodoMutation = useDeleteTodo()
  function deleteTodo(item: Todo) {
    useDeleteTodoMutation.mutate(item.id, {
      onSuccess: () => {
        refetch()
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
                  <TableCell className='flex justify-center items-center mt-1'><Checkbox className='cursor-pointer' checked={item.is_done} onCheckedChange={() => {
                    changeTodoStatus(item)
                  }}/></TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell><FormatedDate date={item.created_at}/></TableCell>
                  <TableCell className="text-center">
                    <div className='flex gap-2 justify-center'>
                      <UpdateTodoDialog refetch={refetch} item={item}/>
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