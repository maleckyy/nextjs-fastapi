import PageTitle from '@/components/page-title'
import React from 'react'
import TodoDataTable from '@/components/todo/TodoDataTable';
import { QueryKeys } from '@/QueryKeys/queryKeys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from '@/api/axiosServer';
export default async function TodoPage() {
  const queryClient = new QueryClient()

  function getTodos() {
    return fetchWithAuth('todo/all')
  }
  
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.TODOS],
    queryFn: getTodos,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <section>
        <PageTitle title="Todos"/>
        <TodoDataTable/>
      </section>
    </HydrationBoundary>
  )
}