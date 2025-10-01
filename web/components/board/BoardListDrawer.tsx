'use client'
import React, { useState } from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { FolderPlus, PanelRightOpen, Plus } from 'lucide-react'
import { useBoardContext } from '@/store/boardContext/boardContext'
import { Separator } from '../ui/separator'
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { useGetBoard } from '@/api/board/boardApi/useGetBoard'
import { useAddNewBoard } from '@/api/board/boardApi/useAddNewBoard'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { cn } from '@/lib/utils'
import EmptyDataBox from '../shared/EmptyDataBox'
import { createToast } from '@/lib/toastService'

export default function BoardListDrawer() {
  const queryClient = useQueryClient()
  const [newBoard, setNewBoard] = useState('')
  const { setBoardIdToParams, getBoardIdFromParams } = useBoardContext()
  const { data } = useGetBoard()
  const addBoardMutation = useAddNewBoard()

  function addNewBoard() {
    const inputValue = newBoard.trim()
    if (inputValue !== "") {
      console.log(inputValue)
      addBoardMutation.mutate({ name: inputValue }, {
        onSuccess: (data) => {
          setNewBoard('')
          createToast("Board created", "success")
          queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD] })
          setBoardIdToParams(data.id)
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
                    onClick={() => {
                      setBoardIdToParams(board.id)
                      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD_ACTIVE, board.id] })
                    }}
                    className={cn(board.id === getBoardIdFromParams() && "font-medium bg-muted rounded-lg ", "small-text-title px-2 py-2 -mx-2 first-letter:uppercase cursor-pointer")}
                  >
                    {board.name}
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
