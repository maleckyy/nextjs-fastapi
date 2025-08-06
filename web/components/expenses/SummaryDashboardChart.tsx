'use client'
import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Label, PieChart, Pie } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useDialog } from '@/store/expenses/DialogContext'
import { useGetExpenseSummary } from '../../api/expense/useGetExpenseSummary'
import { getPolishMonthName } from '@/lib/getPolishMonthName'

const chartConfig = {
  "Wszystkie wydatki": {
    label: "Wszystkie wydatki",
    color: "red",
  },
  "Przychody": {
    label: "Przychody",
    color: "green",
  },
} satisfies ChartConfig;

type PropsType = {
  showLink?: boolean
}

export default function SummaryDashboardChart({ showLink = false }: PropsType) {

  const { refreshFlag } = useDialog()
  const { data, refetch } = useGetExpenseSummary()

  const chartData = React.useMemo(() => {
    if (!data) return []

    if (data.balance === 0) {
      return [
        { title: "Brak danych", amount: 1, fill: "#ccc" }
      ]
    }

    return [
      { title: "Wszystkie wydatki", amount: data.total_expense, fill: "red" },
      { title: "Przychody", amount: data.total_income, fill: "green" },
    ]
  }, [data])

  useEffect(() => {
    refetch()
  }, [refreshFlag, refetch])

  return (
    <Card className="md:max-h-[400px] w-full md:w-2/4 px-6 bg-card shadow-xs" data-testid="monthly-expenses-card">
      <CardDescription>
        <div className='flex flex-row justify-between items-center text-primary'>
          <span className="text-base">{data && getPolishMonthName(data.month) + " -"} Wydatki</span>
          {showLink && <Link href='/finance'>
            <ExternalLink size={18} />
          </Link>}
        </div>
      </CardDescription>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
          data-testid="monthly-expenses-chart"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="title"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data && data.balance}zł
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Balans
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
