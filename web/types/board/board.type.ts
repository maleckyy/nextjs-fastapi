
export type BoardCreate = {
  name: string
}

export type Board = {
  id: string
  created_at: Date
  name: string
}

export enum TaskPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  URGENT = 3
}

export type Task = {
  id: string
  title: string
  description: string
  created_at: Date
  column_id: string
  position: number
  priority: TaskPriority
}

export type BoardColumn = {
  id: string
  name: string
  position: number
  tasks: Task[]
}

export type BoardOutput = {
  board: Board,
  columns: BoardColumn[]
}

export type TaskCreate = {
  title: string,
  position?: number
}

export type TaskCreateRequest = {
  columnId: string,
  boardId: string,
  taskData: TaskCreate
}

export type ChangeTaskDestinationRequestBodyType = {
  taskId: string,
  sourceColumnId: string,
  destinationColumnId: string,
  newTaskPosition: number
}

export type UpdateTask = {
  title: string
  description?: string | undefined
  priority: TaskPriority
}