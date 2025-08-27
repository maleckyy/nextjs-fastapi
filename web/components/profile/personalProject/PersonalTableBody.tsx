'use client'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { PersonalProject } from '@/types/personalProjects/personalProjects.type'
import { Github, SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import TableActionButton from './TableActionButton'
import { useGetPersonalProject } from '@/api/profilePersonalProjects/useGetPersonalProjects'
import EmptyDataBox from '@/components/shared/EmptyDataBox'
import AnimatedSpinner from '@/components/shared/AnimatedSpinner'

export default function PersonalTableBody() {
  const { data, isLoading } = useGetPersonalProject()

  return (
    <TableBody className=''>
      {data && (
        data.map((project: PersonalProject) => {
          return (
            <TableRow key={project.id} data-testid={"project-row-" + project.id}>
              <TableCell className="font-medium"><span className='text-pretty'>
                {project.title}</span>
              </TableCell>
              <TableCell>
                <span className='text-pretty'>{project.description}</span>
              </TableCell>
              <TableCell className='text-center'>
                {project.github ?
                  <Link href={project.github} target='_blank' className='flex justify-center'><Github /><span className='sr-only'>Repository url</span></Link> : "-"
                }
              </TableCell>
              <TableCell className='text-center'>
                {project.demoLink ?
                  <Link href={project.demoLink} target='_blank' className='flex justify-center'><SquareArrowOutUpRight /><span className='sr-only'>Live demo url</span></Link>
                  : "-"
                }
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <TableActionButton project={project} />
                </div>
              </TableCell>
            </TableRow>
          )
        })
      )}
      {data && data.length === 0 && (<TableRow>
        <TableCell colSpan={5}>
          <EmptyDataBox emptyDataText="No data" />
        </TableCell>
      </TableRow>)}
      {isLoading && (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-4">
            <AnimatedSpinner />
          </TableCell>
        </TableRow>)}
    </TableBody>
  )
}
