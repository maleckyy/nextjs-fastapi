'use client'
import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter } from '../ui/card'
import { Label, PieChart, Pie } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useDialog } from '@/store/expenses/DialogContext'
import { useGetExpenseSummary } from '../../api/expense/useGetExpenseSummary'
import { getEnglishMonthName } from '@/lib/getEnglishMonthName'
import TrendingBadge from './TrendingBagde'

const chartConfig = {
  "Wszystkie wydatki": {
    label: "Expenses",
    color: "red",
  },
  "Przychody": {
    label: "Revenue",
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
        { title: "No data", amount: 1, fill: "#ccc" }
      ]
    }

    return [
      { title: "Expenses", amount: data.total_expense, fill: "red" },
      { title: "Revenue", amount: data.total_income, fill: "green" },
    ]
  }, [data])

  useEffect(() => {
    refetch()
  }, [refreshFlag, refetch])

  return (
    <Card className="md:max-h-[400px] w-full md:w-2/4 lg:w-2/5 px-6 bg-card shadow-xs gap-0" data-testid="monthly-expenses-card">
      <CardDescription>
        <div className='flex flex-row justify-between items-center text-primary'>
          <span className="text-base">{data && getEnglishMonthName(data.month) + " -"} Balance</span>
          {showLink && <Link href='/finance'>
            <ExternalLink size={18} />
          </Link>}
        </div>
      </CardDescription>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[320px]"
          data-testid="monthly-expenses-chart"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel prefix='$' />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="title"
              innerRadius={"55%"}
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
                          className="fill-foreground text-3xl md:text-2xl lg:text-3xl font-bold"
                        >
                          ${data && data.balance}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Balance
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
      <CardFooter className='p-0'>
        {data && <TrendingBadge trend={data.trend} />}
      </CardFooter>
    </Card>
  )
}
