import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetAllTodosQuery } from '../services/todoServices';
import RenderErrorMessage from './renderErrorMessage';
import LoadingPage from './loadingPage';
import type { Todo } from '../types/Todo';
import { Button, Textarea, TextInput } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
const TodoDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const {
    data: allTodos,
    isLoading,
    isError,
    error,
  } = useGetAllTodosQuery({
    todoSearch: searchParams.get('todoSearch') ?? undefined,
    deleteStatus: searchParams.get('deleteStatus') ?? undefined,
  });

  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const currentTodoDetails = allTodos?.todos?.find(
      (todo: Todo) => todo?._id === id
    );
    if (currentTodoDetails) {
      setTodo(currentTodoDetails as Todo);
    }
  }, [id, allTodos]);

  return (
    <div className='min-w-full min-h-full flex-grow flex bg-slate-400 justify-center items-center '>
      {isError ? (
        <RenderErrorMessage isError={isError} error={error} />
      ) : isLoading ? (
        <LoadingPage />
      ) : !todo ? (
        <h1 className='w-full text-center font-medium text-white'>
          No Such Todo Found
        </h1>
      ) : (
        <div className='w-[60%] min-h-full flex flex-col justify-start items-start gap-2 my-5 border-[1px] rounded-md bg-slate-200 border-slate-400 shadow-xl p-4 text-pretty overflow-auto'>
          <div className='w-full text-center my-1 text-2xl font-bold'>
            Todo Details
          </div>
          <TextInput
            label='Title'
            value={todo.title}
            className='w-full'
            readOnly
          />
          <Textarea
            label='Description'
            value={todo?.description}
            className='w-full'
            readOnly
          />
          <div className='w-full flex flex-row justify-between items-center gap-2'>
            <TextInput
              label='Current Status'
              value={todo?.status}
              className='w-1/2'
              readOnly
            />
            <TextInput
              label='Priority'
              value={todo?.priority}
              className='w-1/2'
              readOnly
            />
          </div>
          <div className='w-full flex flex-row justify-between items-center gap-2'>
            <TextInput
              label='Due Date'
              value={new Date(todo?.due_date ?? new Date()).toLocaleString()}
              className='w-1/2'
              readOnly
            />
            <TextInput
              label='Deleted Status'
              className='w-1/2'
              value={todo.is_deleted ? 'Deleted' : 'Not Deleted'}
              readOnly
            />
          </div>
          <div className='w-full flex flex-row justify-between items-center gap-2'>
            <TextInput
              label='Created At'
              value={new Date(todo?.created_at ?? new Date()).toLocaleString()}
              className='w-1/2'
              readOnly
            />
            <TextInput
              label='Last Updated At'
              value={new Date(todo?.updated_at ?? new Date()).toLocaleString()}
              className='w-1/2'
              readOnly
            />
          </div>
          <Link to='/'>
            <Button variant='outline' color={'green'}>
              Go Back
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TodoDetailsPage;
