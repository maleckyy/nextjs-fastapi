import { ArrowUp01, Ellipsis, Pen, Trash2 } from 'lucide-react'
import React from 'react'
import useChangeStatusBorderDialog from '@/hooks/board/useChangeStatusBorderDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BoardColumn } from '@/types/board/board.type'

type PropsType = {
  column: BoardColumn
}

export default function ColumnOptionsDropdown({ column }: PropsType) {
  const { openChangeStatusDialog } = useChangeStatusBorderDialog()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger><Ellipsis size={18} /><span className="sr-only">Open status options</span></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem><Pen />Change status name</DropdownMenuItem>
        <DropdownMenuItem onClick={openChangeStatusDialog}><ArrowUp01 />Change status order</DropdownMenuItem>
        <DropdownMenuItem><Trash2 />Delete status</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
