import { Loader } from '@mantine/core';

const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center min-w-full min-h-screen'>
      <Loader color='red' type='dots' />
    </div>
  );
};

export default LoadingPage;
