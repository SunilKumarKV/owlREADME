import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', icon }) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md font-semibold text-white transition duration-300',
        variant === 'primary' && 'bg-blue-500 hover:bg-blue-600 focus:ring-2 ring-offset-2 ring-blue-500',
        variant === 'secondary' && 'bg-gray-300 hover:bg-gray-400 focus:ring-2 ring-offset-2 ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-2 dark:ring-offset-2 dark:ring-gray-700',
        icon && 'flex items-center space-x-2'
      )}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;