import React from 'react';
interface RenderErrorMessageProps {
  isError: boolean;
  error: any;
}
const RenderErrorMessage: React.FC<RenderErrorMessageProps> = ({
  isError,
  error,
}) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      {isError && (
        <div className='text-red-300'>
          {error &&
          'data' in error &&
          error.data &&
          typeof error.data === 'object' &&
          'message' in error.data
            ? (error.data as { message: string }).message
            : 'Something went wrong'}
        </div>
      )}
    </div>
  );
};

export default RenderErrorMessage;
