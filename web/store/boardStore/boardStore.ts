import { BoardColumn, BoardOutput } from '@/types/board/board.type'
import { create } from 'zustand'

type BoardStoreType = {
  board: BoardOutput | undefined,
  setBoard: (newBoardData: BoardOutput) => void,
  addColumnToBoard: (newColumn: BoardColumn) => void
}

export const useBoardStore = create<BoardStoreType>((set) => ({
  board: undefined,
  setBoard: (newBoardData: BoardOutput) => set({ board: newBoardData }),
  addColumnToBoard: (newColumn: BoardColumn) =>
    set((state) => {
      if (!state.board) return state
      return {
        board: {
          ...state.board,
          columns: [...state.board.columns, newColumn],
        },
      }
    }),
}))