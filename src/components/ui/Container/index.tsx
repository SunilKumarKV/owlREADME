import type { ComponentPropsWithoutRef, FC } from 'react';

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: FC<ContainerProps> = ({ children, size = 'lg', className = '', ...props }) => {
  const widths = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-8xl',
    full: 'max-w-full',
  };

  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${widths[size]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
