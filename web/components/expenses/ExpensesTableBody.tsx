'use client'
import React from 'react'
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getExpenseType } from '@/lib/getExpenseType'
import { Badge } from '../ui/badge'
import clsx from 'clsx'
import ExpenseTableActionDropdown from './ExpenseTableActionDropdown'
import EmptyDataBox from '../shared/EmptyDataBox'
import { useGetAllExpenses } from '@/api/expense/useGetAllExpenses'

export default function ExpensesTableBody() {

  const { data } = useGetAllExpenses()

  return (
    <TableBody>
      {data && data.length > 0 ? (
        data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {item.description ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{item.title}</span>
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    <p>{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <span>{item.title}</span>
              )}
            </TableCell>
            <TableCell>
              <Badge
                variant="default"
                className={clsx(
                  'font-bold text-white',
                  item.expense_type !== 0 ? "bg-green-600" : "bg-red-600"
                )}
              >
                {getExpenseType(item.expense_type)}
              </Badge>
            </TableCell>
            <TableCell>{new Date(item.expense_date).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">${item.amount}</TableCell>
            <TableCell>
              <ExpenseTableActionDropdown item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-6">
            <EmptyDataBox emptyDataText="No data" />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
