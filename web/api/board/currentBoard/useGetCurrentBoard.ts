import { useQuery } from "@tanstack/react-query"
import { getCurrentBoard } from "./getCurrentBoard"
import { BoardOutput } from "@/types/board/board.type";
import { QueryKeys } from "@/QueryKeys/queryKeys";

export const useGetCurrentBoard = (boardId: string | undefined) => {
  return useQuery<BoardOutput>({
    queryKey: [QueryKeys.BOARD_ACTIVE, boardId],
    queryFn: () => getCurrentBoard(boardId!),
    enabled: !!boardId,
  });

}