import ChangeStatusDnd from '@/components/board/changeStatusPosition/ChangeStatusDnd'
import { useGlobalDialog } from '@/store/globalDialogContext/globalDialog'
import React from 'react'

export default function useChangeStatusBorderDialog() {
  const { openDialog, closeDialog } = useGlobalDialog()

  function openChangeStatusDialog() {
    openDialog({
      title: "Change status order",
      dataTestId: "change-status-order",
      content: <ChangeStatusDnd closeDialog={closeDialog} />,
      dialogWidth: 400
    })
  }


  return { openChangeStatusDialog, closeDialog }
}
