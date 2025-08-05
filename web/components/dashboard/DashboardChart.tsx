'use client'
import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardDescription } from '../ui/card'
import { getPolishMonthName } from '@/lib/getPolishMonthName'
import { ExpenseStats } from '@/types/expense/expense.type'
import { useGetExpensesStats } from '@/api/expense/useGetExpensesStats'

export default function DashboardChart() {

  const expensesStatsQuery = useGetExpensesStats()
  const { data } = expensesStatsQuery

  const chartData = (data ?? []).map((item: ExpenseStats) => ({
    name: getPolishMonthName(item.month),
    income: item.income,
    expense: item.expense,
  }))

  const chartConfig = {
    income: {
      label: "Przychody",
      color: "#2563eb",
    },
    expense: {
      label: "Wydatki",
      color: "#ef4444",
    },
  } satisfies ChartConfig

  return (
    <Card className='md:max-h-[400px] w-full md:w-3/4 px-6 shadow-xs'>
      <CardDescription className='text-primary'><span className="text-base">Ostatnie 6 miesięcy</span></CardDescription>
      <ChartContainer config={chartConfig} className="min-h-[120px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="income" fill="green" radius={4} />
          <Bar dataKey="expense" fill="red" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
