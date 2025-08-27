import React from 'react'
import { TableHeader, TableRow, TableHead, Table } from '../ui/table'
import SectionTitle from '../shared/texts/SectionTitle'
import AddExperienceButton from '../experience/AddExperienceButton'
import ExperienceTableBody from '../experience/ExperienceTableBody'

export default async function ProfileExperience() {

  return (
    <section className='flex flex-col gap-2'>
      <div className='flex flex-row justify-between'>
        <SectionTitle title="Work experience" />
        <AddExperienceButton />
      </div>
      <div className='max-h-90 overflow-y-auto block'>
        <Table>
          <TableHeader className="sticky top-0 bg-secondary z-10 shadow-sm">
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead>Start date</TableHead>
              <TableHead>End date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <ExperienceTableBody />
        </Table>
      </div>
    </section>
  )
}
