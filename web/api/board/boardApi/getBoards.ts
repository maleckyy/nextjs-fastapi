import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { Board } from "@/types/board/board.type";

export async function getBoards(): Promise<Board[]> {
  const res = await api.get(ApiEndpoints.BOARD)
  return res.data
}