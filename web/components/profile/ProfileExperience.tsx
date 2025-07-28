import React from 'react'
import { TableHeader, TableRow, TableHead, Table } from '../ui/table'
import SectionTitle from '../shared/texts/SectionTitle'
import AddExperienceButton from '../experience/AddExperienceButton'
import ExperienceTableBody from '../experience/ExperienceTableBody'

export default async function ProfileExperience() {

  return (
    <section className='flex flex-col gap-2'>
      <div className='flex flex-row justify-between'>
        <SectionTitle title="Historia zatrudnienia" />
        <AddExperienceButton />
      </div>
      <div className='max-h-64 overflow-y-auto block'>
        <Table>
          <TableHeader className="sticky top-0 bg-secondary z-10 shadow-sm">
            <TableRow>
              <TableHead>Rola</TableHead>
              <TableHead className="text-center">Opis</TableHead>
              <TableHead>Data rozpoczęcia</TableHead>
              <TableHead>Data zakończenia</TableHead>
              <TableHead className="text-center">Akcja</TableHead>
            </TableRow>
          </TableHeader>
          <ExperienceTableBody />
        </Table>
      </div>
    </section>
  )
}
