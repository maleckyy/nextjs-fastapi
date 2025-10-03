import { useQuery } from "@tanstack/react-query"
import { getBoardTask, GetTaskRequest } from "./getBoardTask"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetBoardTask = ({ taskId, boardId }: GetTaskRequest) => {
  return useQuery({
    queryFn: () => getBoardTask({ taskId, boardId }),
    queryKey: [QueryKeys.BOARD_TASK, taskId],
    enabled: !!taskId,
  })
}