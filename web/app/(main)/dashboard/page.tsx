import GenericCard from '@/components/dashboard/DashboardCard'
import SingleCardElement from '@/components/dashboard/SingleTodo'
import PageTitle from '@/components/page-title'
import { Todo } from '@/types/todo/todo.type'

import React from 'react'
export default async function Dashboad() {
  return (
    <section>
      <PageTitle title="Dashboard"/>
      <div className='flex flex-col md:flex-row gap-4'>
        <GenericCard<Todo>
          endpoint="/todo"
          title="Ostatnie zadania"
          renderItem={(item, index) => <SingleCardElement todo={item} key={index} />}
          linkHref="/todo"
          linkText="Zobacz wszystkie"
        />

        <GenericCard<Todo>
          endpoint="/event/upcoming"
          title="Ostatnie eventy"
          renderItem={(item, index) => <SingleCardElement todo={item} key={index} />}
          linkHref="/events"
          linkText="Zobacz wszystkie"
        />
      </div>
    </section>
  )
}
