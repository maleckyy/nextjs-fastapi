import ExpensesTable from '@/components/expenses/ExpensesTable'
import SummaryDashboardChart from '@/components/expenses/SummaryDashboardChart'
import PageTitle from '@/components/page-title'
import { ExpensesDialogProvider } from '@/store/expenses/DialogContext'
import React from 'react'

export default async function ExpensePage() {

  return (
    <ExpensesDialogProvider showDialog>
      <section className='flex flex-col gap-4'>
        <PageTitle title='Finanse' />
        <div className='flex flex-col md:flex-row gap-4'>
          <SummaryDashboardChart />
          <ExpensesTable />
        </div>
      </section>
    </ExpensesDialogProvider>
  )
}
