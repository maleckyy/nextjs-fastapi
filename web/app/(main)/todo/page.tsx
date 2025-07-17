import PageTitle from '@/components/page-title'
import React from 'react'
import TodoDataTable from '@/components/todo/TodoDataTable';
import { QueryKeys } from '@/QueryKeys/queryKeys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from '@/api/axiosServer';
import { ApiEndpoints } from '@/api/routes/apiEndpoints';
export default async function TodoPage() {
  const queryClient = new QueryClient()

  function getTodos() {
    return fetchWithAuth(ApiEndpoints.TODO_ALL)
  }

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.TODOS],
    queryFn: getTodos,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <section className='flex flex-col gap-4'>
        <PageTitle title="Todos" />
        <TodoDataTable />
      </section>
    </HydrationBoundary>
  )
}