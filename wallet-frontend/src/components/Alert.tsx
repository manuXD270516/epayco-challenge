import React from 'react';

interface AlertProps {
  message: string;
  isSuccess: boolean;
}

export const Alert: React.FC<AlertProps> = ({ message, isSuccess }) => {
  if (!message) return null;

  return (
    <div className={`mt-4 px-4 py-2 rounded text-sm ${isSuccess ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
      {message}
    </div>
  );
};
