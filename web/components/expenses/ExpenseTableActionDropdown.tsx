'use client'
import { Expense } from '@/types/expense/expense.type'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { EllipsisVertical, Pen, Trash } from 'lucide-react'
import { useDialog } from '@/store/expenses/DialogContext'
import { useDeleteExpense } from '@/api/expense/useDeleteExpense'
import { createToast } from '@/lib/toastService'

type PropsType = {
  item: Expense
}

export default function ExpenseTableActionDropdown({ item }: PropsType) {
  const { openDialog, triggerExpenseDataRefetch } = useDialog();

  const useDeleteExpenseMutation = useDeleteExpense()
  function deleteExpense(id: string) {
    useDeleteExpenseMutation.mutate(id, {
      onSuccess: () => {
        createToast("Transaction deleted", "info")
        triggerExpenseDataRefetch()
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label={`Row action button for ${item}`}>
          <EllipsisVertical size={18} className='mx-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-26" align="start">
        <DropdownMenuItem onClick={() => openDialog(item)}><Pen /> Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteExpense(item.id)}><Trash /> Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
