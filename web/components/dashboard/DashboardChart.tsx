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
    <Card className="md:max-h-[400px] w-full md:w-2/4 lg:w-3/5 px-6 shadow-xs" data-testid="user-expense-stats-card">
      <CardDescription className="text-primary"><span className="text-base">Ostatnie 6 miesięcy</span></CardDescription>
      <div className="flex-1 min-h-[200px] h-full">
        <ChartContainer config={chartConfig} data-testid="expense-stats-chart" className="w-full h-full" >
          <BarChart accessibilityLayer data={chartData} width={undefined} height={undefined} >
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
      </div>
    </Card>
  )
}
