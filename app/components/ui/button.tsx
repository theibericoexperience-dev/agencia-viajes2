import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

export function Button({ className, children, ...rest }: ButtonProps) {
  const classes = clsx('btn', className);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
