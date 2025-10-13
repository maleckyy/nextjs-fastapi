import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react'
import useChangeStatusBorderDialog from '@/hooks/board/useChangeStatusBorderDialog'

export default function HeaderDropdown() {
  const { openChangeStatusDialog } = useChangeStatusBorderDialog()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger ><Ellipsis size={18} /><span className="sr-only">Open board dropdown menu</span></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel><span>Board options</span></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={openChangeStatusDialog}>Change status order</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
