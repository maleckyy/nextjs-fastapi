import { useQuery } from "@tanstack/react-query"
import { getBoardTask } from "./getBoardTask"
import { QueryKeys } from "@/QueryKeys/queryKeys"

export const useGetBoardTask = (taskId: string) => {
  return useQuery({
    queryFn: () => getBoardTask(taskId),
    queryKey: [QueryKeys.BOARD_TASK, taskId],
    enabled: !!taskId,
  })
}