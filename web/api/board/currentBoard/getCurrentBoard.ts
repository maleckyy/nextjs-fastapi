import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { BoardOutput } from "@/types/board/board.type";

export async function getCurrentBoard(boardId: string) {
  const res = await api.get<BoardOutput>(ApiEndpoints.BOARD + `/${boardId}`)
  return res.data
}