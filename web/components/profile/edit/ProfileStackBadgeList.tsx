'use client'
import { useGetProfileStackQuery } from '@/api/profile/profileStack/useGetProfileStack';
import { Badge } from '@/components/ui/badge';
import React from 'react'

export default function ProfileStackBadgeList() {

  const { data } = useGetProfileStackQuery()
  const stackArray = data ? data.stack.split(',').map(s => s.trim()).filter(Boolean) : []

  return (
    <div className="flex gap-2 flex-wrap">
      {
        data && data.stack !== '' ? (
          stackArray.map((item: string) => <Badge key={item} className='font-medium text-sm uppercase'>{item}</Badge>)
        ) : (
          <p className='small-text-description'>No stack yet</p>
        )
      }
    </div>
  )
}
