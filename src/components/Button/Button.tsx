import { type ButtonHTMLAttributes, type FC, forwardRef, type ReactNode } from 'react';

import styles from './Button.module.scss';

// https://stackoverflow.com/a/66810748/633056

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: ReactNode;
  children?: ReactNode;
  right?: ReactNode;
}

export const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ left, children, right, ...props }, ref): JSX.Element => (
    <button className={styles.button} {...props} ref={ref}>
      <div className={styles.content}>
        {left}
        {children}
        {right}
      </div>
    </button>
  ),
);
