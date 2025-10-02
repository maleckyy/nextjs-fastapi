'use client'
import { DeleteTaskParams } from '@/api/board/boardTask/deleteTaskById'
import { BoardInformationType, UpdateTaskParams } from '@/api/board/boardTask/updateTaskDetails'
import { useDeleteTaskById } from '@/api/board/boardTask/useDeleteTaskById'
import { useGetBoardTask } from '@/api/board/boardTask/useGetBoardTask'
import { useUpdateTaskDetails } from '@/api/board/boardTask/useUpdateTaskDetails'
import { AutoTextarea } from '@/components/shared/Inputs/TextareaResize'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { updateTaskSchema } from '@/schemas/task.schema'
import { BOARD_PARAM_NAME, TASK_PARAM_NAME } from '@/store/boardContext/boardContext'
import { useGlobalDialog } from '@/store/globalDialogContext/globalDialog'
import { UpdateTask } from '@/types/board/board.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Calendar, Flag } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

type PropsType = {
  taskId: string
}

export default function BoardDialogContent({ taskId }: PropsType) {
  const { data, isLoading, status } = useGetBoardTask(taskId)
  const searchParams = useSearchParams();
  const queryClient = useQueryClient()
  type UpdateTaskSchemaType = z.infer<typeof updateTaskSchema>;

  const {
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { isDirty },
  } = useForm<UpdateTaskSchemaType>({
    resolver: zodResolver(updateTaskSchema)
  });

  const deleteTaskMutatnion = useDeleteTaskById()
  const updateTaskMutation = useUpdateTaskDetails()

  const { closeDialog } = useGlobalDialog(() => {
    const values = getValues()
    sendUpdatedTask({ ...values, priority: parseInt(values.priority) })
    removeParamsAfterDelete()
  })

  function sendUpdatedTask(newTaskData: UpdateTask) {
    if (!data) return

    const params: BoardInformationType = {
      boardId: searchParams.get(BOARD_PARAM_NAME) as string,
      columnId: data.column_id,
      taskId: taskId
    }

    const requestData: UpdateTaskParams = {
      boardDetails: params,
      updatedTask: newTaskData
    }
    updateTaskMutation.mutate(requestData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD_TASK, taskId], })
      }
    })

  }

  const removeParamsAfterDelete = useCallback(() => {
    setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(TASK_PARAM_NAME);
      history.pushState(null, '', `?${params.toString()}`);
    }, 0)
  }, [searchParams])

  function deleteTask() {
    if (!data) return
    const params: DeleteTaskParams = {
      boardId: searchParams.get(BOARD_PARAM_NAME) as string,
      columnId: data.column_id,
      taskId: taskId
    }
    deleteTaskMutatnion.mutate(params, {
      onSuccess: () => {
        console.log("udano")
        closeDialog()
        removeParamsAfterDelete()
      }
    })
  }

  function saveTaskData(formData: UpdateTaskSchemaType) {
    sendUpdatedTask({ ...formData, priority: parseInt(formData.priority) })
  }

  useEffect(() => {
    if (status === "error") {
      closeDialog()
      removeParamsAfterDelete()
    }
  }, [status, closeDialog, removeParamsAfterDelete])

  useEffect(() => {
    if (data) {
      reset({
        description: data.description ?? '',
        title: data.title,
        priority: data.priority.toString()
      })
    }
  }, [data, reset])

  if (isLoading) {
    return <p>loading</p>
  }

  if (!data && taskId) {
    return <p>loading1</p>
  }

  if (!data) {
    return <p>loading2</p>
  }

  return (
    <section className='flex flex-col gap-4'>
      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <>
            <input className='text-2xl font-semibold hover:bg-muted' placeholder='Title' {...field} value={field.value ?? ''} type='text' />
          </>
        )}
      />

      <div className='grid grid-cols-2'>
        <span className='flex items-center gap-2'><Calendar size={18} />Created: {new Date(data.created_at).toDateString()}</span>
        <span className='flex items-center gap-2'><Flag size={18} />Priority:
          <span>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full border-0 shadow-none text-[16px] font-normal">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">Low</SelectItem>
                        <SelectItem value="1">Normal</SelectItem>
                        <SelectItem value="2">High</SelectItem>
                        <SelectItem value="3">Urgent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              )}
            />
          </span>
        </span>
      </div>

      <div>
        <p>Description</p>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <>
              <AutoTextarea value={field.value} minRows={5} onChange={field.onChange}></AutoTextarea>
            </>
          )}
        />
      </div>

      <div className='flex justify-end gap-2 items-center'>
        <button className='text-sm cursor-pointer' onClick={deleteTask}>Detele task</button>
        <Button onClick={handleSubmit(saveTaskData)} disabled={!isDirty}>Save</Button>
      </div>
    </section>
  )
}
