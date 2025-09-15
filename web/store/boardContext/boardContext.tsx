'use client'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/QueryKeys/queryKeys";

export type BoardContextType = {
  boardId: string | undefined
  setBoardIdToParams: (boardId: string) => void
  setTaskIdToParams: (taskId: string) => void
  removeTaskIdFromParams: () => void
  getBoardIdFromParams: () => string | null
  getTaskIdFromParams: () => string | null
}

const boardContext = createContext<BoardContextType>({
  boardId: undefined,
  setBoardIdToParams: () => { },
  setTaskIdToParams: () => { },
  removeTaskIdFromParams: () => { },
  getBoardIdFromParams: () => null,
  getTaskIdFromParams: () => null
})

export function useBoardContext() {
  return useContext(boardContext)
}

export default function BoardContextProvider({ children }: { children: ReactNode }) {
  const [boardId, setBoardId] = useState<string>()
  const searchParams = useSearchParams();
  const queryClient = useQueryClient()

  const BOARD_PARAM_NAME = "boardId"
  const BOARD_LOCALSTORAGE_KEY = "last-selected-board"
  const TASK_PARAM_NAME = "taskId"

  function getBoardIdFromParams(): string | null {
    return searchParams.get(BOARD_PARAM_NAME)
  }

  function getTaskIdFromParams(): string | null {
    return searchParams.get(TASK_PARAM_NAME)
  }

  const setParams = useCallback((paramKey: string, paramValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(paramKey, paramValue)
    history.pushState(null, '', `?${params.toString()}`)
  }, [searchParams])

  function removeParams(paramKey: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(paramKey);
    history.pushState(null, '', `?${params.toString()}`);
  }

  function setBoardIdToParams(boardId: string) {
    localStorage.setItem(BOARD_LOCALSTORAGE_KEY, boardId)
    setBoardId(boardId)
    setParams(BOARD_PARAM_NAME, boardId)
  }

  function setTaskIdToParams(taskId: string) {
    setParams(TASK_PARAM_NAME, taskId)
  }

  function removeTaskIdFromParams() {
    removeParams(TASK_PARAM_NAME)
  }

  useEffect(() => {
    const storedBoardId = localStorage.getItem("last-selected-board")
    if (storedBoardId) {
      setParams(BOARD_PARAM_NAME, storedBoardId)
      setBoardId(storedBoardId)
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD_ACTIVE, storedBoardId] })
    }
  }, [setParams, queryClient])

  return (
    <boardContext.Provider value={{ boardId, setBoardIdToParams, setTaskIdToParams, removeTaskIdFromParams, getBoardIdFromParams, getTaskIdFromParams }}>
      {children}
    </boardContext.Provider>
  )
}