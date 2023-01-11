import classnames from 'classnames';
import { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref } from 'react';
import styles from './Input.module.scss';

// https://stackoverflow.com/a/66810748/633056

export interface Props extends ComponentPropsWithRef<'input'> {
  label: string,
  left?: ReactNode,
  middle?: ReactNode,
  right?: ReactNode,
}

export const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ label, left, middle, right, className, ...props }, ref: Ref<HTMLInputElement>): JSX.Element => (
    <div className={styles.field}>
      <div className={styles.group}>
        {left && <div className={classnames(styles.marker, styles.left)}>{left}</div>}
        <input
          className={classnames(styles.input, className)}
          ref={ref}
          {...props}
        />
        {right && <div className={classnames(styles.marker, styles.right)}>{right}</div>}
      </div>
      <label htmlFor={props.id}>{label}</label>
    </div>
  )
);
