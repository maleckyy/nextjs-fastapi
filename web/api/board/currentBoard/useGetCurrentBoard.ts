import { useQuery } from "@tanstack/react-query"
import { getCurrentBoard } from "./getCurrentBoard"
import { BoardOutput } from "@/types/board/board.type";

export const useGetCurrentBoard = (boardId: string | undefined) => {
  return useQuery<BoardOutput>({
    queryKey: ["board-data", boardId],
    queryFn: () => getCurrentBoard(boardId!),
    enabled: !!boardId,
  });

}