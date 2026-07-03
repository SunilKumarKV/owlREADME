import type { FC } from 'react';
import NewInput, { InputProps as NewInputProps } from './ui/Input';

export interface InputProps extends NewInputProps {}

const Input: FC<InputProps> = (props) => {
  return <NewInput {...props} />;
};

export default Input;
export { Input as LegacyInput };