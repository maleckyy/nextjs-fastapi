'use client'
import React, { useCallback, useState } from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../../ui/drawer'
import { FolderPlus, PanelRightOpen, Plus } from 'lucide-react'
import { useBoardContext } from '@/store/boardContext/boardContext'
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useGetBoard } from '@/api/board/boardApi/useGetBoard'
import { useAddNewBoard } from '@/api/board/boardApi/useAddNewBoard'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { cn } from '@/lib/utils'
import { createToast } from '@/lib/toastService'
import { useDeleteBoardById } from '@/api/board/boardApi/deleteBoardById'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import DeleteBoard from './DeleteBoard'
import EmptyDataBox from '@/components/shared/EmptyDataBox'

export default function BoardListDrawer() {
  const queryClient = useQueryClient()
  const [newBoard, setNewBoard] = useState('')
  const { boardId, setBoardIdToParams, getBoardIdFromParams, removeBoardId } = useBoardContext()
  const { data, refetch } = useGetBoard()
  const addBoardMutation = useAddNewBoard()
  const deleteBoardMutation = useDeleteBoardById()

  const deleteBoard = useCallback(() => {
    if (boardId) deleteBoardMutation.mutate(boardId, {
      onSuccess: () => {
        removeBoardId()
        refetch()
      }
    })
  }, [boardId, deleteBoardMutation, removeBoardId, refetch])

  function addNewBoard() {
    const inputValue = newBoard.trim()
    if (inputValue !== "") {
      addBoardMutation.mutate({ name: inputValue }, {
        onSuccess: (data) => {
          setNewBoard('')
          createToast("Board created", "success")
          queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD] })
          setBoardIdToParams(data.id)
          refetch()
        },
        onError: (err) => {
          createToast("Error", "error")
          console.log(err)
        }
      })
    }
  }

  return (
    <Drawer direction='right'>
      <DrawerTrigger><PanelRightOpen size={18} className='cursor-pointer' /><span className='sr-only'>Open board drawer</span></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Boards</DrawerTitle>
          <DrawerDescription className='sr-only'>Boards</DrawerDescription>
        </DrawerHeader>

        <section className='px-4 flex flex-col gap-2'>
          <Separator />
          <section >
            <Popover>
              <PopoverTrigger><span className='medium-text-title flex gap-2 items-center'><FolderPlus size={18} />Add new board</span></PopoverTrigger>
              <PopoverContent>
                <div className='flex flex-col gap-2'>
                  <p>Add new board</p>
                  <div className='flex gap-2'>
                    <Input type="text" className='flex-1' placeholder='Board name' onChange={(e) => { setNewBoard(e.target.value) }} value={newBoard} />
                    <Button onClick={addNewBoard} disabled={newBoard.trim().length < 1}><Plus /><span className='sr-only'>Add new board</span></Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </section>
          <Separator />
          <section >
            <span className='medium-text-title'>Your boards</span>
            <ul className='mt-2'>
              {data && data.map(board => {
                return (
                  <li
                    key={board.id}
                    className={cn(board.id === getBoardIdFromParams() && "font-medium bg-muted rounded-lg ", "small-text-title px-2 py-2 -mx-2 first-letter:uppercase cursor-pointer flex justify-between items-center")}
                  >
                    <p onClick={() => {
                      setBoardIdToParams(board.id)
                      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD_ACTIVE, board.id] })
                    }}
                      className='flex-1'
                    >
                      {board.name}
                    </p>
                    <DeleteBoard deleteFn={deleteBoard} />
                  </li>)
              })}
              {data && data?.length === 0 && <EmptyDataBox emptyDataText='No boards' />}
            </ul>
          </section>
        </section>
      </DrawerContent>
    </Drawer>
  )
}
