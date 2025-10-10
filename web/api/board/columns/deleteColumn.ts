import { api } from "@/api/axios"
import { ApiEndpoints } from "@/api/routes/apiEndpoints"

export type DeleteColumnType = {
  columnId: string,
  boardId: string
}

export async function deleteBoardColumn({ columnId, boardId }: DeleteColumnType) {
  const res = await api.delete(`${ApiEndpoints.BOARD}/${boardId}/column/${columnId}`)
  return res.data
}