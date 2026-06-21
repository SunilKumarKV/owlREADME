import React from 'react';
import clsx from 'clsx';

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, placeholder, rows }) => {
  return (
    <textarea
      className={clsx(
        'px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 ring-offset-2 ring-blue-500 dark:bg-[#1e1e1e] dark:text-white dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-2 dark:ring-offset-2 dark:ring-blue-500',
        rows && `rows-${rows}`
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Textarea;