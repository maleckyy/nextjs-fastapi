import PageTitle from '@/components/page-title'
import { ExpensesDialogProvider } from '@/store/expenses/DialogContext'
import dynamic from 'next/dynamic'
import React from 'react'

export default async function ExpensePage() {

  const ExpensesChartComponent = dynamic(() => import('../../../components/expenses/SummaryDashboardChart'))
  const ExpenseDataTable = dynamic(() => import('../../../components/expenses/ExpensesTable'))

  return (
    <ExpensesDialogProvider showDialog>
      <section className='flex flex-col gap-4'>
        <PageTitle title='Finance' data-testid="finance-header" />
        <div className='flex flex-col md:flex-row gap-4'>
          <ExpensesChartComponent />
          <ExpenseDataTable />
        </div>
      </section>
    </ExpensesDialogProvider>
  )
}
