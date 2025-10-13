import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { ColumnCreate } from "@/types/board/board.type";

export async function addNewColumn(colData: ColumnCreate) {
  const res = await api.post(`${ApiEndpoints.BOARD}/${colData.board_id}/column`, colData)
  return res.data
}
