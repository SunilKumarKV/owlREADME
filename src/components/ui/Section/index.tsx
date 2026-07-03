import type { ComponentPropsWithoutRef, FC } from 'react';

export interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  spacing?: 'sm' | 'md' | 'lg';
}

export const Section: FC<SectionProps> = ({ children, spacing = 'md', className = '', ...props }) => {
  const paddings = {
    sm: 'py-4 md:py-6',
    md: 'py-8 md:py-12',
    lg: 'py-16 md:py-24',
  };

  return (
    <section className={`${paddings[spacing]} ${className}`} {...props}>
      {children}
    </section>
  );
};

export default Section;
