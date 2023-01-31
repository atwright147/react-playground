import classnames from 'classnames';
import { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref } from 'react';
import styles from './Input.module.scss';
import { Messages } from '../Messages/Messages';

// https://stackoverflow.com/a/66810748/633056

export interface Props extends Omit<ComponentPropsWithRef<'input'>, 'name' | 'id'> {
  label: string,
  id: string,
  name: string,
  left?: ReactNode,
  middle?: ReactNode,
  right?: ReactNode,
  errors?: any,
}

export const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ label, name, id, left, middle, right, className, errors, ...props }, ref: Ref<HTMLInputElement>): JSX.Element => {
    const describedby = `${id}--errors`;

    return (
      <div className={styles.field}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.group}>
          {left && <div className={classnames(styles.marker, styles.left)}>{left}</div>}
          <input
            id={id}
            className={classnames(styles.input, className)}
            aria-describedby={describedby}
            ref={ref}
            {...props}
          />
          {right && <div className={classnames(styles.marker, styles.right)}>{right}</div>}
        </div>
        <Messages messages={errors} id={describedby} />
      </div>
    );
  }
);

