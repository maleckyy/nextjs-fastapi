import React from 'react'
import { Card, CardDescription } from '../ui/card'
import { Expense } from '@/types/expense/expense.type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
import { fetchWithAuth } from '@/api/axiosServer'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import AddExpenseButton from './AddExpenseButton'
import EmptyDataBox from '../shared/EmptyDataBox'

export default async function ExpensesTable() {
  const data: Expense[] = await fetchWithAuth(ApiEndpoints.EXPENSE)

  return (
    <Card className='md:max-h-[400px] w-full md:w-3/4 px-6 shadow-xs'>
      <CardDescription className='text-primary text-base'>
        <div className='flex justify-between items-center'>
          <span>Lista wszystkich traksakcji</span>
          <AddExpenseButton />
        </div>
      </CardDescription>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tytuł</TableHead>
              <TableHead>Rodzaj</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Kwota</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
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
                  <TableCell className="text-right">{item.amount}</TableCell>
                  <TableCell>
                    <ExpenseTableActionDropdown item={item} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <EmptyDataBox emptyDataText="Brak danych do wyświetlenia" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
