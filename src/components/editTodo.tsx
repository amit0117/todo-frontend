import React, { useState } from 'react';
import type { Todo } from '../types/Todo';
import { Modal, Select, Textarea, TextInput } from '@mantine/core';
import { useUpdateTodoMutation } from '../services/todoServices';
import LoadingPage from './loadingPage';
import { DateTimePicker, DateValue } from '@mantine/dates';
import RenderErrorMessage from './renderErrorMessage';
interface EditTodoPageProps {
  todo: Todo;
  onCancel: () => void;
}
const EditTodoPage: React.FC<EditTodoPageProps> = ({ todo, onCancel }) => {
  const [updateTodo, { isError, error, isLoading }] = useUpdateTodoMutation();
  const [updatedTodo, setUpdatedTodo] = useState<Todo>(todo);
  const statusList = ['pending', 'in_progress', 'completed'];
  const priorityList = ['low', 'medium', 'high'];
  const deletedStatus = ['true', 'false'];
  function updateTodoHandler(field: string, value: any) {
    setUpdatedTodo((updatedTodo) => ({ ...updatedTodo, [field]: value }));
  }
  async function updateTodoInDbHandler() {
    console.log('in updatedtodoindbhandler updated data is', updatedTodo);
    await updateTodo(updatedTodo);
    onCancel();
  }
  return (
    <Modal
      opened={true}
      onClose={onCancel}
      title='Edit Todo Details'
      className='relative pb-4 w-full'
      h={'auto'}
      size={'lg'}
    >
      {isError ? (
        <RenderErrorMessage isError={isError} error={error} />
      ) : isLoading ? (
        <LoadingPage />
      ) : (
        <div className='w-full bg-slate-300 p-2 rounded'>
          <div className='flex-col gap-3 justify-start items-start text-black w-full'>
            <TextInput
              label='Title'
              value={updatedTodo.title}
              onChange={(e: any) =>
                updateTodoHandler('title', e.currentTarget.value)
              }
              placeholder='Enter title ...'
            />
            <Textarea
              label='Description'
              value={updatedTodo.description}
              onChange={(e: any) =>
                updateTodoHandler('description', e.currentTarget.value)
              }
              placeholder='Enter Description ...'
            />
            <div className='flex flex-row justify-between items-center gap-2 min-w-full my-4'>
              <Select
                label='Priority'
                data={priorityList}
                value={updatedTodo.priority}
                onChange={(priority: any) =>
                  updateTodoHandler('priority', priority)
                }
                checkIconPosition='right'
                className='w-1/2'
                defaultValue={'medium'}
                placeholder='choose priority...'
                clearable
              />

              <Select
                label='Status'
                defaultValue={'pending'}
                placeholder='Choose Status...'
                data={statusList}
                value={updatedTodo.status}
                onChange={(status: any) => updateTodoHandler('status', status)}
                checkIconPosition='right'
                className='w-1/2'
                clearable
              />
            </div>
            <div className='flex flex-row justify-between items-center gap-2 w-full'>
              <DateTimePicker
                onChange={(date: DateValue) =>
                  updateTodoHandler('due_date', date)
                }
                value={new Date(updatedTodo.due_date)}
                className='font-normal w-1/2'
                placeholder='Select Due date'
                label='Due Date'
                clearable
              />
              <Select
                label='Delete Stautus'
                placeholder='Choose Delete Status...'
                data={deletedStatus}
                value={updatedTodo.is_deleted ? 'true' : 'false'}
                onChange={(deleteStatus: any) =>
                  updateTodoHandler('is_deleted', deleteStatus === 'true')
                }
                checkIconPosition='right'
                className='w-1/2'
                clearable
              />
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-row justify-start items-center gap-2  bottom-1 mt-4'>
        <button
          type='button'
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={updateTodoInDbHandler}
          disabled={isLoading}
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditTodoPage;
