'use client'
import React, { useCallback, useEffect, useState } from 'react'
import BoardListDrawer from './BoardListDrawer'
import { useBoardContext } from '@/store/boardContext/boardContext'
import { useGetCurrentBoard } from '@/api/board/currentBoard/useGetCurrentBoard'
import ChangeBoardNamePopover from './ChangeBoardNamePopover'
import { useUpdateBoardName } from '@/api/board/boardApi/useUpdateBoardName'

export default function BoardHeader() {
  const { boardId } = useBoardContext()
  const { data: boardData } = useGetCurrentBoard(boardId)
  const [boardName, setBoardName] = useState<string | undefined>("")
  const updateBoardNameMutation = useUpdateBoardName()

  const changeBoardName = useCallback((newName: string) => {
    const reqBody = {
      newData: { name: newName },
      boardId: boardId as string
    }

    updateBoardNameMutation.mutate(reqBody, {
      onSuccess: (response: string) => {
        setBoardName(response)
      }
    })
  }, [boardId, updateBoardNameMutation])

  useEffect(() => {
    if (boardData) {
      setBoardName(boardData.board.name)
    }
  }, [boardData])

  return (
    <div className='flex justify-between mb-4'>
      <div className='flex gap-2'>
        {boardData && <ChangeBoardNamePopover changeBoardName={changeBoardName} boardName={boardData.board.name} />}
        <h2 className='medium-text-title'>
          {boardName ?? "No board selected"}
        </h2>
      </div>
      <BoardListDrawer />
    </div>
  )
}
