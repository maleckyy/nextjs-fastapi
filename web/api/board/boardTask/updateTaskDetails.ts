import { api } from "@/api/axios";
import { UpdateTask } from "@/types/board/board.type";

export type BoardInformationType = {
  boardId: string
  columnId: string
  taskId: string
}

export type UpdateTaskParams = {
  updatedTask: UpdateTask,
  boardDetails: BoardInformationType
}

export async function updateTaskDetails({ updatedTask, boardDetails }: UpdateTaskParams) {
  const res = await api.patch(`/board/${boardDetails.boardId}/column/${boardDetails.columnId}/task/${boardDetails.taskId}`, updatedTask)
  return res.data
}