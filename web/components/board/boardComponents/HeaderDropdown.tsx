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
import { useGlobalDialog } from '@/store/globalDialogContext/globalDialog'
import ChangeStatusDnd from '../changeStatusPosition/ChangeStatusDnd'

export default function HeaderDropdown() {

  const { openDialog, closeDialog } = useGlobalDialog()

  function openChangeStatusDialog() {
    openDialog({
      title: "Change status order",
      dataTestId: "change-status-order",
      content: <ChangeStatusDnd closeDialog={closeDialog} />,
      dialogWidth: 400
    })
  }

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
