'use client'
import FormatedDate from '@/components/todo/FormatedDate';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Todo, TodoUpdate } from '@/types/todo/todo.type';
import { Trash } from 'lucide-react';
import React from 'react'
import CreateTodoDialog from '@/components/todo/TodoCreateDialog';
import TodoPopover from '@/components/todo/TodoPopover';
import { useDeleteTodo } from '@/api/todo/useDeleteTodo';
import UpdateTodoDialog from '@/components/todo/TodoUpdateDialog';
import { useUpdateMutatnion } from '@/api/todo/useUpdateTodo';
import { useGetTodo } from '@/api/todo/useGetTodo';
import { createToast } from '@/lib/toastService';
import EmptyDataBox from '../shared/EmptyDataBox';
import AnimatedSpinner from '../shared/AnimatedSpinner';
import { useIconSize } from '@/hooks/rwd-hooks/useIconSize';

export default function TodoDataTable() {
  const { data, isLoading, refetch } = useGetTodo()
  const useUpdateTodoMutation = useUpdateMutatnion()
  const useDeleteTodoMutation = useDeleteTodo()
  const iconSize = useIconSize()

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
        createToast("Status zmieniony", "success", "Status zadania został zmieniony")
        refetch()
      },
      onError: (error) => {
        console.log(error)
        createToast("Błąd", "error", error.message)
      },
    })
  }

  function deleteTodo(item: Todo) {
    useDeleteTodoMutation.mutate(item.id, {
      onSuccess: () => {
        createToast("Usunięto zadanie", "info", `Zadanie o nazwie: ${item.title} zostało usunięte`)
        refetch()
      },
      onError: (error) => {
        console.log(error)
        createToast("Błąd", "error", error.message)
      }
    })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center"></TableHead>
          <TableHead className="w-[150px]">Nazwa</TableHead>
          <TableHead>Opis</TableHead>
          <TableHead>Data utworzenia</TableHead>
          <TableHead className="text-center"><CreateTodoDialog refetch={refetch} /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              <AnimatedSpinner />
            </TableCell>
          </TableRow>
        ) : data && data.length > 0 ? (
          data.map((item: Todo) => (
            <TableRow key={item.id}>
              <TableCell className='flex justify-center items-center mt-1'>
                <Checkbox className='cursor-pointer' checked={item.is_done} onCheckedChange={() => changeTodoStatus(item)} />
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell><FormatedDate date={item.created_at} /></TableCell>
              <TableCell className="text-center">
                <div className='flex gap-2 justify-center'>
                  <UpdateTodoDialog refetch={refetch} item={item} />
                  <TodoPopover iconNode={<Trash size={iconSize} />} fn={() => deleteTodo(item)} popoverText='Czy napewno usunąć ten element?' />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>
              <EmptyDataBox emptyDataText="Brak zadań" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
