import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import { useMutation } from "@tanstack/react-query";

async function deleteBoardById(boardId: string) {
  const res = await api.delete(ApiEndpoints.BOARD + "/" + boardId)
  return res.data
}

export const useDeleteBoardById = () => {
  return useMutation({
    mutationFn: deleteBoardById
  })
}