import type { ComponentPropsWithoutRef, FC } from 'react';

export interface AvatarProps extends ComponentPropsWithoutRef<'img'> {
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: FC<AvatarProps> = ({ src, fallback, size = 'md', className = '', ...props }) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-20 w-20 text-2xl',
  };

  return (
    <div className={`relative inline-flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden select-none flex-shrink-0 ${sizes[size]} ${className}`}>
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={src} alt={props.alt || ''} className="h-full w-full object-cover" {...props} />
      ) : (
        <span className="font-semibold text-gray-600 dark:text-gray-300 uppercase">
          {fallback.substring(0, 2)}
        </span>
      )}
    </div>
  );
};

export default Avatar;
