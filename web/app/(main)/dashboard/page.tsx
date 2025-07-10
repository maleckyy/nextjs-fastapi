import GenericCard from '@/components/dashboard/DashboardCard'
import SingleCardElement from '@/components/dashboard/SingleTodo'
import PageTitle from '@/components/page-title'
import { Todo } from '@/types/todo/todo.type'

import React from 'react'
export default async function Dashboad() {
  return (
    <section>
      <PageTitle title="Dashboard" />
      <div className='flex flex-col md:flex-row gap-4'>
        <GenericCard<Todo>
          endpoint="/todo"
          title="Ostatnie zadania"
          renderItem={(item, index) => <SingleCardElement todo={item} key={index} />}
          linkHref="/todo"
          noDataText='Brak zadań'
        />

        <GenericCard<Todo>
          endpoint="/event/upcoming"
          title="Nadchodzące wydarzenia"
          renderItem={(item, index) => <SingleCardElement todo={item} key={index} />}
          linkHref="/events"
          noDataText='Brak nadchodzących wydarzeń'
        />
      </div>
    </section>
  )
}
