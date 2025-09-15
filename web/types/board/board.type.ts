
export type BoardCreate = {
  name: string
}

export type Board = {
  id: string
  created_at: Date
  name: string
}

export type Task = {
  id: string
  name: string
  title: string
  description: string
  created_at: Date
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