import React from 'react'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '../ui/table'
import SectionTitle from '../shared/texts/SectionTitle'
import { Plus } from 'lucide-react'

export default function ProfileExperience() {
  return (
    <section className='flex flex-col gap-2'>
      <div className='flex flex-row justify-between'>
        <SectionTitle title="Historia zatrudnienia - dodawane nowego" />
        {/* popover */}
        <Plus />
      </div>
      <div className='max-h-64 overflow-y-auto block'>
        <Table>
          <TableHeader className="sticky top-0 bg-secondary z-10 shadow-sm">
            <TableRow>
              <TableHead >Rola</TableHead>
              <TableHead>Data rozpoczęcia</TableHead>
              <TableHead>Data zakończenia</TableHead>
              <TableHead className="text-center">Akcja</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">FE developer</TableCell>
              <TableCell>01.01.2023</TableCell>
              <TableCell>01.01.2025</TableCell>
              <TableCell className="text-center">X</TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </div>
    </section>
  )
}
