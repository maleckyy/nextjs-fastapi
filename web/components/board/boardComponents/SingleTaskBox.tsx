import { getTaskPriorityName } from '@/lib/getTaskPriorityName'
import { Task } from '@/types/board/board.type'
import { Calendar, Flag } from 'lucide-react'
import React, { memo } from 'react'

type PropsType = {
  task: Task,
}

function SingleTaskBox({ task }: PropsType) {
  return (
    <div className='flex flex-col gap-1'>
      <span className='-mt-1 mb-1 medium-text-title font-semibold capitalize'>{task.title}</span>
      <span className='flex items-center gap-2 text-sm small-text-title'><Flag size={16} />{getTaskPriorityName(task.priority)}</span>
      <span className='flex items-center gap-2 text-sm small-text-title'><Calendar size={16} />{new Date(task.created_at).toDateString()}</span>
    </div>
  )
}

export default memo(SingleTaskBox)