import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import GenericCard from '@/components/dashboard/DashboardCard'
import SingleCardElement from '@/components/dashboard/SingleCardElement'
import PageTitle from '@/components/page-title'
import PageSection from '@/components/shared/PageSection'
import { ExpensesDialogProvider } from '@/store/expenses/DialogContext'
import { EventOutput } from '@/types/events/event.type'
import { Todo } from '@/types/todo/todo.type'
import dynamic from 'next/dynamic'
import React from 'react'

const DashboardChartComponent = dynamic(() => import('../../../components/dashboard/DashboardChart'))
const ExpensesChartComponent = dynamic(() => import('../../../components/expenses/SummaryDashboardChart'))

export default async function Dashboad() {
  return (
    <PageSection>
      <PageTitle title="Dashboard" data-testid="dashboard-header" />
      <div className='overflow-y-auto'>
        <div className='flex flex-col md:flex-row gap-4 md:flex-nowrap flex-wrap pb-4'>
          <ExpensesDialogProvider>
            <ExpensesChartComponent showLink />
          </ExpensesDialogProvider>
          <DashboardChartComponent />
        </div>
        <div className='flex flex-col md:flex-row gap-4 lg:flex-nowrap flex-wrap'>
          <GenericCard<Todo>
            endpoint={ApiEndpoints.TODO_LAST}
            title="Recent tasks"
            renderItem={(item, index) => <SingleCardElement title={item.title} description={item.description} key={index} index={index} />}
            linkHref="/todo"
            noDataText='No tasks'
            data-testid="last-todos-card"
          />
          <GenericCard<EventOutput>
            endpoint={ApiEndpoints.EVENTS_UPCOMING}
            title="Upcoming events"
            renderItem={(item, index) => <SingleCardElement title={item.title} description={item.description} key={index} index={index} date={item.event_date} />}
            linkHref="/events"
            noDataText='No upcoming events'
            data-testid="upcoming-events-card"
          />
        </div>
      </div>
    </PageSection>
  )
}
