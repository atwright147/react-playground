import classnames from 'classnames';
import { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref } from 'react';
import styles from './Checkbox.module.scss';
import { Messages } from '../Messages/Messages';

// https://stackoverflow.com/a/66810748/633056

export interface Props extends Omit<ComponentPropsWithRef<'input'>, 'name' | 'id' | 'type'> {
  label: string,
  id: string,
  name: string,
  left?: ReactNode,
  middle?: ReactNode,
  right?: ReactNode,
  errors?: any,
}

export const Checkbox: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ label, name, id, className, errors, ...props }, ref: Ref<HTMLInputElement>): JSX.Element => {
    const describedby = `${id}--errors`;

    return (
      <div className={styles.field}>
        <label htmlFor={id} className={styles.label}>
          <input
            id={id}
            className={classnames(styles.input, className)}
            type="checkbox"
            aria-describedby={describedby}
            ref={ref}
            {...props}
          />
          <span className={styles.checkmark}></span>
          {label}
        </label>
        <Messages messages={errors} id={describedby} />
      </div>
    );
  }
);
