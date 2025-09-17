import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string; variant?: 'primary' | 'ghost' | 'duotone' };

export function Button({ className, children, variant = 'primary', ...rest }: ButtonProps) {
  const base = 'btn';
  const variantClass = variant === 'duotone' ? 'btn-duotone' : variant === 'ghost' ? 'btn-ghost' : '';
  const classes = clsx(base, variantClass, className);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
