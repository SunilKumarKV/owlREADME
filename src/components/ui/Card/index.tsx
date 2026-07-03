import type { ComponentPropsWithoutRef, FC } from 'react';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  hoverable?: boolean;
}

export const Card: FC<CardProps> = ({ children, hoverable = false, className = '', ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm transition-all duration-200 p-6 motion-safe:transform motion-safe:duration-200 ${
        hoverable ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
