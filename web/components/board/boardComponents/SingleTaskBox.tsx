import { getTaskPriorityColor } from '@/lib/getTaskPriorityColor'
import { getTaskPriorityName } from '@/lib/getTaskPriorityName'
import { cn } from '@/lib/utils'
import { useBoardViewStore } from '@/store/boardStore/boardViewStore'
import { Task } from '@/types/board/board.type'
import { Calendar, Flag } from 'lucide-react'
import React, { memo } from 'react'

type PropsType = {
  task: Task,
}

function SingleTaskBox({ task }: PropsType) {
  const listView = useBoardViewStore(state => state.listView)

  return (
    <div className={cn('flex cursor-pointer', listView ? "md:flex-row flex-col md:items-center justify-start gap-2" : "flex-col gap-1")}>
      <span className={cn('-mt-1 medium-text-title font-semibold capitalize', listView ? "mr-auto" : "mb-1 ")}>{task.title}</span>
      <span className={cn('flex items-center gap-2 text-sm small-text-title', listView ? "w-40" : "")}><Calendar size={16} />{new Date(task.created_at).toDateString()}</span>
      <span className={cn('flex items-center gap-2 text-sm small-text-title', listView ? "w-20" : "")}><Flag size={16} fill={getTaskPriorityColor(task.priority)} />{getTaskPriorityName(task.priority)}</span>
    </div>
  )
}

export default memo(SingleTaskBox)