'use server'
import { Card, CardContent, CardTitle } from '../ui/card'
import Link from 'next/link'
import { fetchWithAuth } from '@/api/axiosServer'
import React from 'react'
import { ExternalLink } from 'lucide-react'

interface GenericCardProps<T> {
  endpoint: string
  title: string
  renderItem: (item: T, index: number) => React.ReactNode
  linkHref?: string
  noDataText: string
}

export default async function GenericCard<T>({
  endpoint,
  title,
  renderItem,
  linkHref,
  noDataText,
}: GenericCardProps<T>) {
  const data: T[] = await fetchWithAuth(endpoint)

  return (
    <Card className="gap-4 w-full">
      <CardTitle className="px-6">
        <div className='flex flex-row justify-between items-center'>
          {title}
          {linkHref && <Link href={linkHref}>
            <ExternalLink />
          </Link>}
        </div>
      </CardTitle>
      <CardContent>
        {data.length === 0 ? (<p>{noDataText}</p>) :
          (data.map((item, index) => renderItem(item, index)))
        }
      </CardContent>
    </Card>
  )
}