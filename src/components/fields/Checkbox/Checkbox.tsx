import classnames from 'classnames';
import { type ComponentPropsWithRef, type FC, type ReactNode, type Ref, forwardRef } from 'react';
import { Messages } from '../Messages/Messages';
import styles from './Checkbox.module.scss';

// https://stackoverflow.com/a/66810748/633056

export interface Props extends Omit<ComponentPropsWithRef<'input'>, 'name' | 'id' | 'type'> {
  label: string;
  id: string;
  name: string;
  left?: ReactNode;
  middle?: ReactNode;
  right?: ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: fix later
  errors?: any;
  indeterminate?: boolean;
}

export const Checkbox: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ indeterminate = false, label, name, id, className, errors, ...props }, ref: Ref<HTMLInputElement>): JSX.Element => {
    const describedby = `${id}--errors`;

    return (
      <div className={classnames(styles.field, className)}>
        <label htmlFor={id} className={styles.label}>
          <input
            id={id}
            className={styles.input}
            type="checkbox"
            aria-describedby={describedby}
            ref={ref}
            {...props}
            data-indeterminate={indeterminate}
          />
          <span className={styles.checkmark} />
          {label}
        </label>
        <Messages messages={errors} id={describedby} />
      </div>
    );
  },
);
