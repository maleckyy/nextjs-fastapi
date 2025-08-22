import PageTitle from '@/components/page-title'
import PageContent from '@/components/shared/PageContent'
import PageSection from '@/components/shared/PageSection'
import { appMetadata } from '@/seoMetadata'
import { ExpensesDialogProvider } from '@/store/expenses/DialogContext'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

export const metadata: Metadata = appMetadata.finance

export default async function ExpensePage() {
  const ExpensesChartComponent = dynamic(() => import('../../../components/expenses/SummaryDashboardChart'))
  const ExpenseDataTable = dynamic(() => import('../../../components/expenses/ExpensesTable'))
  const DashboardChartComponent = dynamic(() => import('../../../components/dashboard/DashboardChart'))

  return (
    <ExpensesDialogProvider showDialog>
      <PageSection>
        <PageTitle title='Finance' data-testid="finance-header" />
        <PageContent>
          <div className='flex flex-col md:flex-row gap-4 md:flex-nowrap flex-wrap pb-4'>
            <ExpensesChartComponent />
            <DashboardChartComponent />
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <ExpenseDataTable />
          </div>
        </PageContent>
      </PageSection>
    </ExpensesDialogProvider>
  )
}
