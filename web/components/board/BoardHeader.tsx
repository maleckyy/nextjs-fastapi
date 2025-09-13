'use client'
import React from 'react'
import BoardListDrawer from './BoardListDrawer'
import { useBoardContext } from '@/store/boardContext/boardContext'
import { useGetCurrentBoard } from '@/api/board/currentBoard/useGetCurrentBoard'

export default function BoardHeader() {
  const { boardId } = useBoardContext()
  const { data: boardData } = useGetCurrentBoard(boardId)
  return (
    <div className='flex justify-between mb-4'>
      <h2 className='medium-text-title'>
        {boardData?.board.name ?? "brak"}
      </h2>
      <BoardListDrawer />
    </div>
  )
}
