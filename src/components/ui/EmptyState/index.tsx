import type { FC, ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ title, description, icon = '📁', action, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 border border-dashed border-gray-300 dark:border-gray-800 rounded-lg text-center ${className}`}>
      <span className="text-3xl mb-3 select-none">{icon}</span>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{title}</h3>
      <p className="text-2xs text-gray-500 dark:text-gray-400 max-w-xs mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
