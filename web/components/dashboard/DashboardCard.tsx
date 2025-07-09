'use server'
import { Card, CardContent, CardTitle } from '../ui/card'
import Link from 'next/link'
import { fetchWithAuth } from '@/api/axiosServer'
import React from 'react'

interface GenericCardProps<T> {
  endpoint: string
  title: string
  renderItem: (item: T, index: number) => React.ReactNode
  linkHref?: string
  linkText?: string
}

export default async function GenericCard<T>({
  endpoint,
  title,
  renderItem,
  linkHref,
  linkText,
}: GenericCardProps<T>) {
  const data: T[] = await fetchWithAuth(endpoint)

  return (
    <Card className="gap-4 w-full">
      <CardTitle className="px-6">{title}</CardTitle>
      <CardContent>
        {data.map((item, index) => renderItem(item, index))}
        {linkHref && linkText && (
          <div className='flex justify-end'>
            <Link href={linkHref} className="text-bold text-gray-500 underline">
              {linkText}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}