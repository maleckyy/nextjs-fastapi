import SectionTitle from '@/components/shared/texts/SectionTitle'
import React from 'react'
import ProjectsTable from './ProjectsTable'
import AddProjectButton from './AddProjectButton'

export default function PersonalProjectSection() {
  return (
    <section className='flex flex-col gap-2' data-testid="personal-projects-section">
      <div className='flex flex-row justify-between'>
        <SectionTitle title="Personal Projects" />
        <AddProjectButton />
      </div>
      <div className='max-h-90 overflow-y-auto block'>
        <ProjectsTable />
      </div>
    </section>
  )
}
