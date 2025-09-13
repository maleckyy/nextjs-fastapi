import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { Board, BoardCreate } from "@/types/board/board.type";

export async function addNewBoard(newBoardData: BoardCreate): Promise<Board> {
  const res = await api.post(ApiEndpoints.BOARD, newBoardData)
  return res.data
}