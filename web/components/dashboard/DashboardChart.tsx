'use client'
import React from 'react'
import { Bar, BarChart } from 'recharts'
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Card, CardDescription } from '../ui/card'

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function DashboardChart() {
  return (
    <Card className='md:max-h-[400px] w-full md:w-1/2 px-6 bg-card shadow-xs bg-gradient-to-t from-primary/5 to-card dark'>
      <CardDescription className='text-primary'>Wykresy</CardDescription>
      <ChartContainer config={chartConfig} className="min-h-[120px]">
        <BarChart data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
