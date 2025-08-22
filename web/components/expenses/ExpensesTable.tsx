import React from 'react'
import { Card, CardDescription } from '../ui/card'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddExpenseButton from './AddExpenseButton'
import dynamic from 'next/dynamic'
import LastTransactionsButton from './LastTransactions'

const ExpensesTableBodyComponent = dynamic(() => import("../../components/expenses/ExpensesTableBody"))
export default async function ExpensesTable() {
  return (
    <Card className='max-h-[400px] w-full md:w-full px-6 shadow-xs'>
      <CardDescription className='text-primary text-base'>
        <div className='flex justify-between items-center'>
          <span>List of all transactions</span>
          <LastTransactionsButton />
        </div>
      </CardDescription>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-secondary z-10 shadow-sm">
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px] text-center"><AddExpenseButton /><span className='sr-only'>Add new transaction</span></TableHead>
            </TableRow>
          </TableHeader>
          <ExpensesTableBodyComponent />
        </Table>
      </div>
    </Card>
  )
}
