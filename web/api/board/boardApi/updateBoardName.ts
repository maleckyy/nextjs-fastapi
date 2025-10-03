import { api } from "@/api/axios"

export type UpdateBoardName = {
  name: string
}
export type ChangeBoardNameReq = {
  newData: UpdateBoardName,
  boardId: string
}
export async function updateBoardName(data: ChangeBoardNameReq) {
  const res = await api.patch(`/board/${data.boardId}`, data.newData)
  return res.data
}