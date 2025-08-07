import GenericCard from '@/components/dashboard/DashboardCard'
import SingleCardElement from '@/components/dashboard/SingleTodo'
import PageTitle from '@/components/page-title'
import { ExpensesDialogProvider } from '@/store/expenses/DialogContext'
import { Todo } from '@/types/todo/todo.type'
import dynamic from 'next/dynamic'
import React from 'react'

const DashboardChartComponent = dynamic(() => import('../../../components/dashboard/DashboardChart'))
const ExpensesChartComponent = dynamic(() => import('../../../components/expenses/SummaryDashboardChart'))

export default async function Dashboad() {
  return (
    <section className='flex flex-col gap-4'>
      <PageTitle title="Dashboard" />
      <div className='flex flex-col md:flex-row gap-4 md:flex-nowrap flex-wrap'>
        <ExpensesDialogProvider>
          <ExpensesChartComponent showLink />
        </ExpensesDialogProvider>
        <DashboardChartComponent />
      </div>
      <div className='flex flex-col md:flex-row gap-4 lg:flex-nowrap flex-wrap'>
        <GenericCard<Todo>
          endpoint="/todo"
          title="Ostatnie zadania"
          renderItem={(item, index) => <SingleCardElement todo={item} key={index} />}
          linkHref="/todo"
          noDataText='Brak zadań'
          data-testid="last-todos-card"
        />

        <GenericCard<Todo>
          endpoint="/event/upcoming"
          title="Nadchodzące wydarzenia"
          renderItem={(item, index) => <SingleCardElement todo={item} key={index} />}
          linkHref="/events"
          noDataText='Brak nadchodzących wydarzeń'
          data-testid="upcoming-events-card"
        />
      </div>
    </section>
  )
}
