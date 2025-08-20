'use client'
import { ExpenseFormType, expenseSchema } from '@/schemas/expense.schema'
import { Expense } from '@/types/expense/expense.type'
import React from 'react'
import AppInputField from '../shared/Inputs/AppInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AppDatePicker from '../shared/Inputs/AppDatePicker'
import AppSelect from '../shared/Inputs/AppSelect'
import { Button } from '../ui/button'
import { useAddNewExpense } from '@/api/expense/useAddNewExpense'
import { createToast } from '@/lib/toastService'
import { useDialog } from '@/store/expenses/DialogContext'
import { useUpdateExpense } from '@/api/expense/useUpdateExpense'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@/QueryKeys/queryKeys'

type PropsType = {
  expenseData?: Expense
}

export default function ExpenseForm({ expenseData }: PropsType) {
  const { closeDialog, triggerExpenseDataRefetch } = useDialog();
  const formSchema = expenseSchema

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ExpenseFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expense_type: expenseData ? expenseData.expense_type : 0
    }
  });

  const selectOptions = [
    {
      value: 0,
      name: "Expense"
    },
    {
      value: 1,
      name: "Revenue"
    }
  ]

  const useAddNewExpenseMutation = useAddNewExpense()
  const useUpdateExpenseMutation = useUpdateExpense()
  const queryClient = useQueryClient()

  function cleanAfterSuccessAction() {
    triggerExpenseDataRefetch()
    queryClient.invalidateQueries({ queryKey: [QueryKeys.EXPENSE_STATS] })
    queryClient.invalidateQueries({ queryKey: [QueryKeys.EXPENSE] })
    reset()
    closeDialog()
  }

  function handleSubmitAction(formData: ExpenseFormType) {
    if (expenseData) {
      const updateData = {
        data: formData,
        id: expenseData.id
      }
      useUpdateExpenseMutation.mutate(updateData, {
        onSuccess: () => {
          createToast("Transaction updated", "success")
          cleanAfterSuccessAction()
        },
        onError: (error) => {
          createToast("Error", "error", error.message)
        }
      })

    } else {
      useAddNewExpenseMutation.mutate(formData, {
        onSuccess: () => {
          createToast("Add new transaction", "success")
          cleanAfterSuccessAction()
        },
        onError: (error) => {
          createToast("Error", "error", error.message)
        }
      })
    }
  }

  return (
    <div className="flex flex-col">
      <AppInputField name="title" control={control} label="Transaction title" error={errors.title?.message} defaultInputValue={expenseData && expenseData.title} />
      <AppInputField name="description" control={control} label="Description" error={errors.description?.message} defaultInputValue={expenseData && expenseData.description} />
      <AppDatePicker name="expense_date" control={control} label="Transaction date" error={errors.expense_date?.message} defaultInputValue={expenseData && new Date(expenseData.expense_date)} />
      <AppSelect name="expense_type" control={control} label="Type" error={errors.expense_type?.message} selectOptions={selectOptions} />
      <AppInputField name="amount" type="number" control={control} label="Amout" error={errors.amount?.message} defaultInputValue={expenseData && expenseData.amount} />
      <div className='flex justify-end mt-[16px]'>
        <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleSubmitAction)} disabled={isSubmitting || !isDirty}>{expenseData ? ("Update ") : ("Add ")}</Button>
      </div>
    </div>
  )
}
