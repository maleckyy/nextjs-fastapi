'use client'
import React from 'react'
import { TableBody, TableCell, TableRow } from '../ui/table'
import ExperienceTableActionMenu from './ExperienceTableActionMenu'
import ExperienceDescriptionPopover from './ExperienceDescriptionPopover'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/axios'
import { ApiEndpoints } from '@/api/routes/apiEndpoints'
import { ExperienceOut } from '@/types/experience/experience.type'
import { QueryKeys } from '@/QueryKeys/queryKeys'

export default function ExperienceTableBody() {

  async function getExperience() {
    const response = await api.get(ApiEndpoints.PROFILE_EXPERIENCE)
    return response.data
  }

  const { data } = useQuery({
    queryKey: [QueryKeys.PROFILE_EXPERIENCE],
    queryFn: getExperience
  })

  return (
    <TableBody>
      {data && (
        data.map((experience: ExperienceOut) => {
          return <TableRow key={experience.id}>
            <TableCell className="font-medium">{experience.position}</TableCell>
            <TableCell className="font-medium flex justify-center">
              <ExperienceDescriptionPopover description={experience.description} />
            </TableCell>
            <TableCell>{new Date(experience.starting_date).toLocaleDateString()}</TableCell>
            <TableCell>{experience.ending_date !== null ? (new Date(experience.ending_date!).toLocaleDateString()) : ("Obecnie")}</TableCell>
            <TableCell className="flex justify-center"><ExperienceTableActionMenu experienceItem={experience} /></TableCell>
          </TableRow>
        })
      )}
    </TableBody>
  )
}
