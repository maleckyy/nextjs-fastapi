'use client'
import { Expense } from '@/types/expense/expense.type'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { EllipsisVertical, Pen, Trash } from 'lucide-react'
import { useDialog } from '@/store/expenses/DialogContext'
import { useDeleteExpense } from '@/api/expense/useDeleteExpense'
import { createToast } from '@/lib/toastService'
import { useRouter } from 'next/navigation'

type PropsType = {
  item: Expense
}

export default function ExpenseTableActionDropdown({ item }: PropsType) {

  const { openDialog, triggerExpenseDataRefetch } = useDialog();
  const router = useRouter()

  const useDeleteExpenseMutation = useDeleteExpense()
  function deleteExpense(id: string) {
    useDeleteExpenseMutation.mutate(id, {
      onSuccess: () => {
        createToast("Usunięto transakcję", "success")
        router.refresh()
        triggerExpenseDataRefetch()
      }
    })
  }

  function openEditModal() {
    openDialog(item)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem onClick={() => openEditModal()}><Pen /> Edytuj traksakcję</DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteExpense(item.id)}><Trash /> Usuń transakcję</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
