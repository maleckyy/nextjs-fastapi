import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import TodoDataTable from '../todo/TodoDataTable'

export default function AllTodosCard() {
  return (
    <Card className=" w-full xl:w-3/5 max-h-[500px]">
      <CardDescription className="px-6">
        <h3 className="text-base">All Tasks</h3>
      </CardDescription>
      <CardContent className="flex-1 overflow-x-auto">
        <TodoDataTable />
      </CardContent>
    </Card>
  )
}
