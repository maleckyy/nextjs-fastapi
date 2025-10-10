import React, { memo } from 'react'
import { ArrowUp01, Ellipsis, Pen, Trash2 } from 'lucide-react'
import useChangeStatusBorderDialog from '@/hooks/board/useChangeStatusBorderDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { BoardColumn } from '@/types/board/board.type'
import { useDeleteColumn } from '@/api/board/columns/useDeleteColumn'
import { createToast } from '@/lib/toastService'
import { useBoardStore } from '@/store/boardStore/boardStore'

type PropsType = {
  column: BoardColumn
}

function ColumnOptionsDropdown({ column }: PropsType) {
  const { openChangeStatusDialog } = useChangeStatusBorderDialog()
  const deleteColumnMutation = useDeleteColumn()
  const deleteColumn = useBoardStore(state => state.deleteColumn)

  function handleConfirmDelete() {
    deleteColumnMutation.mutate({ columnId: column.id, boardId: column.board_id }, {
      onSuccess: () => {
        createToast("Status deleted", "info")
        deleteColumn(column.id)
      },
      onError: () => {
        createToast("Error", "error")
      }
    })
  }

  return (
    <DropdownMenu>
      <div className="flex-shrink-0">
        <DropdownMenuTrigger >
          <div className="cursor-pointer">
            <Ellipsis size={18} />
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-56" align="start" >
        <DropdownMenuItem>
          <Pen size={18} />Change status name
        </DropdownMenuItem>

        <DropdownMenuItem onClick={openChangeStatusDialog}>
          <ArrowUp01 />Change status order
        </DropdownMenuItem>

        <DropdownMenuSub >
          <DropdownMenuSubTrigger className='flex gap-2'><Trash2 size={16} />Delete status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem className='text-red-400' onClick={handleConfirmDelete}>Delete status with tasks</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(ColumnOptionsDropdown)
