import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import styles from './site-shell.module.css';

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function Reveal<T extends ElementType = 'div'>({
  as,
  children,
  delay = 0,
  className,
  style,
  ...props
}: RevealProps<T>) {
  const Component = as ?? 'div';
  const classes = [styles.reveal, className].filter(Boolean).join(' ');

  return (
    <Component
      className={classes}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}

