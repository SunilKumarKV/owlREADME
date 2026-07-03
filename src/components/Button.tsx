import type { FC } from 'react';
import NewButton, { ButtonProps as NewButtonProps } from './ui/Button';

export interface ButtonProps extends Omit<NewButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary';
  title?: string;
}

const Button: FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  const dsVariant = variant === 'secondary' ? 'secondary' : 'primary';
  return <NewButton variant={dsVariant} {...props} />;
};

export default Button;
export { Button as LegacyButton };