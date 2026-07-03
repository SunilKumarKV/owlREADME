import type { FC } from 'react';
import NewTextarea, { TextareaProps as NewTextareaProps } from './ui/Textarea';

export interface TextareaProps extends NewTextareaProps {}

const Textarea: FC<TextareaProps> = (props) => {
  return <NewTextarea {...props} />;
};

export default Textarea;
export { Textarea as LegacyTextarea };