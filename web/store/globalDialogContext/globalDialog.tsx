'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

type DialogData = {
  title?: string
  description?: string
  content?: ReactNode,
  dataTestId?: string
}

type DialogContextType = {
  openDialog: (data: DialogData) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const useGlobalDialog = () => {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('useDialog must be used inside DialogProvider')
  return ctx
}

export const GlobalDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [dialogData, setDialogData] = useState<DialogData>({})

  const openDialog = (data: DialogData) => {
    setDialogData(data)
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
    setDialogData({})
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen} data-testid={dialogData.dataTestId}>
        <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
          {dialogData.title && (
            <DialogTitle className="mb-2">{dialogData.title}</DialogTitle>
          )}
          {dialogData.description && (
            <DialogDescription className="text-sm text-gray-500 mb-4">{dialogData.description}</DialogDescription>
          )}
          {dialogData.content}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  )
}