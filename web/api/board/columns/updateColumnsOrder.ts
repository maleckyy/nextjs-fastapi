import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { UpdateColumnPosition } from "@/types/board/board.type";
export type UpdateColumnsOrderType = {
  boardId: string,
  cols: UpdateColumnPosition[]
}
export async function updateColumnsOrder({ boardId, cols }: UpdateColumnsOrderType) {
  const res = await api.patch(`${ApiEndpoints.BOARD}/${boardId}/column`, cols)
  return res.data
}