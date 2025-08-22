import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import GenericCard from '@/components/dashboard/DashboardCard'
import DashboardChart from '@/components/dashboard/DashboardChart'
import SingleCardElementWithAmount from '@/components/dashboard/SingleCardElementWithAmount'
import SingleCardElementWithDate from '@/components/dashboard/SingleCardElementWithDate'
import SummaryDashboardChart from '@/components/expenses/SummaryDashboardChart'
import PageTitle from '@/components/page-title'
import PageContent from '@/components/shared/PageContent'
import PageSection from '@/components/shared/PageSection'
import { appMetadata } from '@/seoMetadata'
import { ExpensesDialogProvider } from '@/store/expenses/DialogContext'
import { EventOutput } from '@/types/events/event.type'
import { Expense } from '@/types/expense/expense.type'
import { Todo } from '@/types/todo/todo.type'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = appMetadata.dashboard

export default async function Dashboad() {
  return (
    <PageSection>
      <PageTitle title="Dashboard" data-testid="dashboard-header" />
      <PageContent>
        <div className='flex flex-col md:flex-row gap-4 md:flex-nowrap flex-wrap pb-4'>
          <ExpensesDialogProvider>
            <SummaryDashboardChart showLink />
          </ExpensesDialogProvider>
          <DashboardChart />
        </div>
        <div className='flex flex-col lg:grid lg:grid-cols-2 xl:flex xl:flex-row xl:flex-nowrap gap-4'>
          <GenericCard<Todo>
            endpoint={ApiEndpoints.TODO_LAST}
            title="Recent tasks"
            renderItem={(item, index) => <SingleCardElementWithDate title={item.title} description={item.description} key={index} index={index} />}
            linkHref="/todo"
            noDataText='No tasks'
            data-testid="last-todos-card"
          />
          <GenericCard<EventOutput>
            endpoint={ApiEndpoints.EVENTS_UPCOMING}
            title="Upcoming events"
            renderItem={(item, index) => <SingleCardElementWithDate title={item.title} description={item.description} key={index} index={index} date={item.event_date} />}
            linkHref="/events"
            noDataText='No upcoming events'
            data-testid="upcoming-events-card"
          />
          <GenericCard<Expense>
            endpoint={ApiEndpoints.EXPENSE_RECENT_TRANSACTION}
            title="Recent transactions"
            renderItem={(item, index) => <SingleCardElementWithAmount title={item.title} description={item.description} key={index} index={index} amount={item.amount} expense_type={item.expense_type} />}
            linkHref="/finance"
            noDataText='No transactions'
            data-testid="recent-transaction-card"
          />
        </div>
      </PageContent>
    </PageSection>
  )
}
