import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import PersonalTableBody from './PersonalTableBody'

export default function ProjectsTable() {
  return (
    <Table data-testid="personal-project-table">
      <TableHeader className="sticky top-0 bg-secondary z-10 shadow-sm">
        <TableRow>
          <TableHead>Project name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className='w-[80px] text-center'>Github</TableHead>
          <TableHead className='w-[80px] text-center'>Live demo</TableHead>
          <TableHead className="w-[80px] text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <PersonalTableBody />
    </Table>
  )
}
