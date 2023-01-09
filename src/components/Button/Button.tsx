import { ButtonHTMLAttributes, FC, forwardRef, ReactNode } from 'react';

import styles from './Button.module.scss';

// https://stackoverflow.com/a/66810748/633056

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: ReactNode,
  middle?: ReactNode,
  right?: ReactNode,
}

export const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ left, middle, right, ...props }, ref): JSX.Element => (
    <button className={styles.button} {...props} ref={ref}>
      <div className={styles.content}>
        {left}
        {middle}
        {right}
      </div>
    </button>
  )
);


// import React, { ButtonHTMLAttributes, forwardRef } from "react";

// export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//     myExtraProp1: string;
//     myExtraProp2: string;
// }

// export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//     ({ myExtraProp1, myExtraProp2, ...props }, ref) => (
//         <button
//             {...props}
//             ref={ref}
//             // Do something with the extra props
//         />
//     ),
// );

// Button.displayName = 'Button';
