import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type BoardViewType = {
  listView: boolean,
  setView: (f: boolean) => void
}

export const useBoardViewStore = create<BoardViewType>()(
  persist(
    (set) => ({
      listView: false,
      setView: (f: boolean) => set({ listView: f })
    }),
    {
      name: 'board-view',
    }
  )
)
