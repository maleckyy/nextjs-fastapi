import { BoardColumn, BoardOutput, Task, UpdateColumnPosition } from '@/types/board/board.type'
import { create } from 'zustand'

type BoardStoreType = {
  board: BoardOutput | undefined,
  setBoard: (newBoardData: BoardOutput) => void,
  addColumnToBoard: (newColumn: BoardColumn) => void,
  addTaskToColumn: (colId: string, newTask: Task) => void,
  updateColumnsOrder: (newColsPosition: UpdateColumnPosition[]) => void,
  deleteColumn: (colId: string) => void,
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
  addTaskToColumn: (colId: string, newTask: Task) =>
    set((state) => {
      if (!state.board) return state

      const updatedColumns = state.board.columns.map((col) => {
        if (col.id === colId) {
          return {
            ...col,
            tasks: [...col.tasks, newTask],
          }
        }
        return col
      })

      return {
        board: {
          ...state.board,
          columns: updatedColumns,
        },
      }
    }),
  updateColumnsOrder: (newColsPosition: UpdateColumnPosition[]) =>
    set((state) => {
      if (!state.board) return state
      const updatedColumns = state.board.columns.map(col => {
        const newPos = newColsPosition.find(c => c.id === col.id)?.position
        return newPos !== undefined ? { ...col, position: newPos } : col
      })
      updatedColumns.sort((a, b) => a.position - b.position)
      return {
        board: {
          ...state.board,
          columns: updatedColumns,
        },
      }
    }),
  deleteColumn: (colId: string,) =>
    set((state) => {
      if (!state.board) return state
      const updatedColumns = state.board.columns.filter(col => col.id != colId)
      return {
        board: {
          ...state.board,
          columns: updatedColumns
        }
      }
    }),
}))