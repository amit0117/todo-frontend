export type Todo = {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  is_deleted: boolean;
  due_date: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateTodo = {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed' | 'in-progress';
  priority?: 'low' | 'medium' | 'high';
  is_deleted?: boolean;
  due_date?: string;
};

export type AllTodoResponse = {
  todos: Todo[];
};
