export type Todo = {
  title: string;
  description: string;
  id: string;
  is_done: boolean;
  created_at: string;
};

export type TodoContent = {
    title: string;
    description: string;
    is_done: boolean;
  }

export type TodoCreate = {
  title: string;
  description: string;
}

export type TodoUpdate = {
  newTodo: TodoContent
  id: string
}