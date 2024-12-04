import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Ensure `/react` is included
import type { Todo, AllTodoResponse, CreateTodo } from '../types/Todo';
import baseUrl from '../utils/baseUrl';
import { getToken } from '../utils/getToken';
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    createTodo: builder.mutation<Todo, CreateTodo>({
      query: (data) => ({
        method: 'POST',
        url: '/api/todos',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response: Todo) => {
        return response;
      },
      invalidatesTags: (_, __, ___) => [{ type: 'Todos', id: 'TodoLists' }],
    }),
    getTodoById: builder.query<Todo, string>({
      query: (id) => ({
        method: 'GET',
        url: `/api/todos/${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      transformResponse: (response: Todo) => {
        return response;
      },
      providesTags: (_, __, id) => [
        { type: 'Todos', id },
        { type: 'Todos', id: 'TodoLists' },
      ],
    }),
    getAllTodos: builder.query<
      AllTodoResponse,
      { todoSearch?: string | undefined; deleteStatus?: string | undefined }
    >({
      query: ({ todoSearch, deleteStatus }) => ({
        method: 'GET',
        url: `/api/todos/all?todoSearch=${encodeURIComponent(
          todoSearch ?? ''
        )}&deleted_status=${encodeURIComponent(deleteStatus ?? '')}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: (results, _, __) =>
        !!results
          ? [
              ...results.todos.map(({ _id }) => ({
                type: 'Todos' as const,
                id: _id,
              })),
              { type: 'Todos', id: 'TodoLists' },
            ]
          : [{ type: 'Todos', id: 'TodoLists' }],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (data) => ({
        method: 'PUT',
        url: `/api/todos/${data._id}`,
        cache: 'no-store',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: (_, __, arg) => [
        { type: 'Todos', id: arg._id },
        { type: 'Todos', id: 'TodoLists' },
      ],
    }),
    deleteTodo: builder.mutation<Todo, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/api/todos/${id}`,
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Todos', id },
        { type: 'Todos', id: 'TodoLists' },
      ],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} = todoApi;
