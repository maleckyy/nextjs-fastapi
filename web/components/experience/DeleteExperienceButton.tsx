import { useDeleteExperience } from '@/api/experience/useDeleteExperience'
import { createToast } from '@/lib/toastService'
import { QueryKeys } from '@/QueryKeys/queryKeys'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'

type PropsType = {
  experienceId: string,
}
export default function DeleteExperienceButton({ experienceId }: PropsType) {
  const useDeleteExperienceMutation = useDeleteExperience()
  const queryClient = useQueryClient()

  function deleteItem(id: string) {
    useDeleteExperienceMutation.mutate(id, {
      onSuccess: () => {
        createToast("Usunięto", "success")
        queryClient.invalidateQueries({ queryKey: [QueryKeys.PROFILE_EXPERIENCE] })
      },
      onError: (e) => {
        createToast("Błąd", "error", e.message)
      }
    })
  }

  return (
    <DropdownMenuItem onClick={() => deleteItem(experienceId)}>
      <div>Usuń</div>
    </DropdownMenuItem>
  )
}
