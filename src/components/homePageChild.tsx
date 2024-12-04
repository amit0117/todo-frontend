import React, { useState, memo } from 'react';
import {
  useGetAllTodosQuery,
  useDeleteTodoMutation,
  useCreateTodoMutation,
} from '../services/todoServices';
import RenderErrorMessage from './renderErrorMessage';
import LoadingPage from './loadingPage';
import { Button, Table } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faInfoCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import EditTodoPage from './editTodo';
import WarningMessage from './warningMessage';

interface HomePageProps {
  todoSearch?: string;
  deleteStatus?: string;
}

const HomePageChild: React.FC<HomePageProps> = ({
  todoSearch,
  deleteStatus,
}) => {
  const {
    data: allTodos,
    isLoading,
    isError,
    error,
  } = useGetAllTodosQuery({ todoSearch, deleteStatus });

  const [
    softTodoDelete,
    { isLoading: deleteIsLoading, isError: deleteIsError, error: deleteError },
  ] = useDeleteTodoMutation();
  const [
    _,
    { isError: createIsError, error: createError, isLoading: createIsLoading },
  ] = useCreateTodoMutation();

  const [selectedTodoIndexForUpdate, setSelectedTodoIndexForUpdate] = useState<
    number | null
  >(null);
  const [
    selectedTodoIndexForSoftDeletion,
    setSelectedTodoIndexForSoftDeletion,
  ] = useState<number | null>(null);

  const headers = [
    'SI No.',
    'Title',
    'Status',
    'Priority',
    'Deleted',
    'Due Date',
    'Edit',
    'Delete',
    'Details',
  ];

  const handleSoftDeleteTodo = async () => {
    if (
      selectedTodoIndexForSoftDeletion !== null &&
      allTodos?.todos?.[selectedTodoIndexForSoftDeletion]
    ) {
      const todoIdToBeDeleted =
        allTodos.todos[selectedTodoIndexForSoftDeletion]._id;
      await softTodoDelete(todoIdToBeDeleted);
      setSelectedTodoIndexForSoftDeletion(null);
    }
  };
  let searchQuery = `?`;
  if (todoSearch && todoSearch.trim() !== '') {
    searchQuery += `todoSearch=${encodeURIComponent(todoSearch)}`;
  }
  if (deleteStatus && deleteStatus.trim() !== '') {
    searchQuery += `deleteStatus=${encodeURIComponent(deleteStatus)}`;
  }

  const isGlobalLoading = isLoading || createIsLoading || deleteIsLoading;

  return (
    <div className='min-w-full min-h-full'>
      {/* Render Errors */}
      {deleteIsError && (
        <RenderErrorMessage isError={deleteIsError} error={deleteError} />
      )}
      {createIsError && (
        <RenderErrorMessage isError={createIsError} error={createError} />
      )}

      {isError ? (
        <RenderErrorMessage isError={isError} error={error} />
      ) : isGlobalLoading ? (
        <LoadingPage />
      ) : (
        <div className='w-full mt-4 bg-slate-700 h-full border-[1px] border-white overflow-auto my-8 rounded flex flex-col justify-center items-center'>
          <Table striped highlightOnHover verticalSpacing='sm'>
            <Table.Thead>
              <Table.Tr>
                {headers.map((header, index) => (
                  <Table.Td
                    key={index}
                    className='text-[13px] text-nowrap text-white font-bold'
                  >
                    {header}
                  </Table.Td>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className='bg-slate-300'>
              {allTodos?.todos?.length === 0 ? (
                <Table.Tr>
                  <Table.Td
                    colSpan={headers.length}
                    align='center'
                    style={{ minWidth: '100%', color: 'white' }}
                  >
                    Empty Todo Data!!
                  </Table.Td>
                </Table.Tr>
              ) : (
                allTodos?.todos?.map((todo: any, index: number) => (
                  <Table.Tr key={todo._id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{todo.title}</Table.Td>
                    <Table.Td>{todo.status}</Table.Td>
                    <Table.Td>{todo.priority}</Table.Td>
                    <Table.Td>{todo.is_deleted ? 'Yes' : 'No'}</Table.Td>
                    <Table.Td>
                      {new Date(todo.due_date).toLocaleString()}
                    </Table.Td>
                    <Table.Td>
                      <Button
                        variant='outline'
                        onClick={() => setSelectedTodoIndexForUpdate(index)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </Table.Td>
                    <Table.Td>
                      <Button
                        variant='outline'
                        onClick={() =>
                          setSelectedTodoIndexForSoftDeletion(index)
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className='text-red-500'
                        />
                      </Button>
                    </Table.Td>
                    <Table.Td>
                      <Link to={`/${todo._id}${searchQuery}`}>
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className='text-green-400 cursor-pointer text-[30px]'
                        />
                      </Link>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </div>
      )}

      {/* Render Edit Todo Modal */}
      {selectedTodoIndexForUpdate !== null && (
        <EditTodoPage
          onCancel={() => setSelectedTodoIndexForUpdate(null)}
          // @ts-ignore
          todo={allTodos?.todos?.[selectedTodoIndexForUpdate]}
        />
      )}

      {/* Render Soft Deletion Warning */}
      {selectedTodoIndexForSoftDeletion !== null && (
        <WarningMessage
          warningMessage='Are you sure you want to delete this Todo? It will only be marked as deleted. You can still retrieve it in the future.'
          onclose={() => setSelectedTodoIndexForSoftDeletion(null)}
          onApprove={handleSoftDeleteTodo}
        />
      )}
    </div>
  );
};

export default memo(HomePageChild);
