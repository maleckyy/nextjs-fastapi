'use client'
import React from 'react'
import { useSidebar } from '../ui/sidebar'
import { NotepadTextDashed } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CustomSidebarHeader() {
  const { state } = useSidebar()

  return (
    <div className='flex flex-row justify-center gap-1 p-1'>
      <NotepadTextDashed />
      <span className={cn(state === "collapsed" && "hidden", "base-font")}>PSPACE</span>
    </div>
  )
}
