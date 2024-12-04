import React from 'react';
import { Modal } from '@mantine/core';
interface WarningMessageProps {
  warningMessage: string;
  onclose: () => void;
  onApprove: () => void;
}
const WarningMessage: React.FC<WarningMessageProps> = ({
  warningMessage,
  onApprove,
  onclose,
}) => {
  return (
    <Modal opened={true} size='md' onClose={onclose} h='auto'>
      <div className='text-center'>
        <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
          {warningMessage}
        </h3>
        <div className='flex justify-start items-center gap-2 text-sm '>
          <button
            className='bg-slate-300 border-gray-400 border-[2px] px-3 py-2 rounded-lg'
            onClick={onclose}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 px-3 py-2 rounded-lg border-[2px] border-gray-400'
            onClick={onApprove}
          >
            {"Yes, I'm sure"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningMessage;
