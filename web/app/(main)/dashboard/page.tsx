import LastTodoCard from '@/components/dashboard/LastTodoCard'
import PageTitle from '@/components/page-title'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

import React from 'react'
export default function Dashboad() {


  return (
    <section>
      <PageTitle title="Dashboard"/>
      <div className='flex gap-4'>
        <LastTodoCard/>

        <Card className='gap-4 w-full'>
          <CardTitle className='px-6'>Nadchodzące wydarzenia</CardTitle>
          <CardContent>czesc</CardContent>
        </Card>
      </div>
    </section>
  )
}
