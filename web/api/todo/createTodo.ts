import { api } from "../axios"
import { ApiEndpoints } from "../routes/apiEndpoints"

export const createNewTodo = async (data:{title: string, description: string}) => {
    const response = await api.post(ApiEndpoints.TODO_CREATE, data)
    return response.data
}