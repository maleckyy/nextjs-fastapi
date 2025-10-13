'use client'
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"
import { useBoardViewStore } from "@/store/boardStore/boardViewStore"
import { List, SquareKanban } from "lucide-react"

export default function BoardViewToggle() {
  const listView = useBoardViewStore(state => state.listView)
  const changeBoardView = useBoardViewStore(state => state.setView)
  const styleBase = 'text-sm transition rounded-none h-6  cursor-pointer px-3 text-black disabled:text-black'

  return (
    <div className="flex rounded-md overflow-hidden">
      <Toggle
        key={1}
        pressed={listView}
        onPressedChange={() => changeBoardView(true)}
        disabled={listView}
        className={cn(styleBase)}
      >
        <List></List>List
      </Toggle>
      <Toggle
        key={0}
        pressed={!listView}
        onPressedChange={() => changeBoardView(false)}
        disabled={!listView}
        className={cn(styleBase)}
      >
        <SquareKanban />Board
      </Toggle>
    </div>
  )
}
