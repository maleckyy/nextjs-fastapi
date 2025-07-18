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
import { useRouter } from 'next/navigation'
import { useDialog } from '@/store/expenses/DialogContext'
import { useUpdateExpense } from '@/api/expense/useUpdateExpense'

type PropsType = {
  expenseData?: Expense
}

export default function ExpenseForm({ expenseData }: PropsType) {
  const { closeDialog, triggerExpenseDataRefetch } = useDialog();
  const router = useRouter()
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
      name: "Wydatek"
    },
    {
      value: 1,
      name: "Przychód"
    }
  ]

  const useAddNewExpenseMutation = useAddNewExpense()
  const useUpdateExpenseMutation = useUpdateExpense()

  function cleanAfterSuccessAction() {
    router.refresh()
    triggerExpenseDataRefetch()
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
          createToast("Edytowano transakcję", "success")
          cleanAfterSuccessAction()
        },
        onError: (error) => {
          createToast("Błąd", "error", error.message)
        }
      })

    } else {
      useAddNewExpenseMutation.mutate(formData, {
        onSuccess: () => {
          createToast("Dodano nową transakcję", "success")
          cleanAfterSuccessAction()
        },
        onError: (error) => {
          createToast("Błąd", "error", error.message)
        }
      })
    }
  }

  return (
    <div className="flex flex-col">
      <AppInputField name="title" control={control} label="Nazwa transakcji" error={errors.title?.message} defaultInputValue={expenseData && expenseData.title} />
      <AppInputField name="description" control={control} label="Opis" error={errors.description?.message} defaultInputValue={expenseData && expenseData.description} />
      <AppDatePicker name="expense_date" control={control} label="Data transakcji" error={errors.expense_date?.message} defaultInputValue={expenseData && new Date(expenseData.expense_date)} />
      <AppSelect name="expense_type" control={control} label="Rodzaj transakcji" error={errors.expense_type?.message} selectOptions={selectOptions} />
      <AppInputField name="amount" type="number" control={control} label="Kwota" error={errors.amount?.message} defaultInputValue={expenseData && expenseData.amount} />
      <div className='flex justify-end mt-[16px]'>
        <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleSubmitAction)} disabled={isSubmitting || !isDirty}>{expenseData ? ("Edytuj ") : ("Dodaj ")}transakcję</Button>
      </div>
    </div>
  )
}
