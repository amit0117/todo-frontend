import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../utils/useDebounceHook';
import { Button, Select, TextInput } from '@mantine/core';
import CraeateTodoPage from './createTodo';
import HomePageChild from './homePageChild';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [showCreateNewTodo, setShowCreateNewTodo] = useState<boolean>(false);
  const [todoSearchQuery, setTodoSearchQuery] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<string | undefined>(
    undefined
  );
  const deleteStatusList = ['all', 'true', 'false'];

  // I am assuming debouncing time to be 500 millisecond
  const debouncedSearchTerm = useDebounce(todoSearchQuery ?? '', 500);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className='min-w-full min-h-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-2 w-[90%] h-full'>
        <div className='flex flex-row justify-between items-center w-full border-[1px] border-slate-200 rounded-md p-2'>
          <div className='text-white px-2 py-4 font-extrabold text-2xl text-nowrap'>
            All Todos
          </div>
          <TextInput
            value={todoSearchQuery ?? ''}
            onChange={(e: any) => setTodoSearchQuery(e.currentTarget.value)}
            className='flex-grow flex-shrink px-10'
            placeholder='Search for todo items...'
          />
          <Select
            data={deleteStatusList}
            onChange={(status: any) =>
              setDeleteStatus(status === 'all' ? null : status)
            }
            value={deleteStatus ?? 'all'}
            clearable
            placeholder='Select delete status...'
            className='w-fit px-2'
            checkIconPosition='right'
          />
          <Button
            variant='outline'
            color='white'
            style={{ whiteSpace: 'nowrap', minWidth: '100px' }}
            onClick={() => setShowCreateNewTodo(true)}
          >
            Add New Task
          </Button>
        </div>
        <div className='w-full h-full'>
          <HomePageChild
            todoSearch={debouncedSearchTerm}
            deleteStatus={deleteStatus}
          />
        </div>
      </div>
      {showCreateNewTodo && (
        <CraeateTodoPage onCancel={() => setShowCreateNewTodo(false)} />
      )}
    </div>
  );
};

export default HomePage;
