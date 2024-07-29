import classnames from 'classnames';
import { type ChangeEvent, type ComponentPropsWithRef, type FC, forwardRef, ReactNode, type Ref, useState } from 'react';
import styles from './Textarea.module.scss';
import { Messages } from '../Messages/Messages';

// https://stackoverflow.com/a/66810748/633056

export interface Props extends Omit<ComponentPropsWithRef<'textarea'>, 'name' | 'id'> {
  label: string;
  id: string;
  name: string;
  errors?: any;
}

export const Textarea: FC<Props> = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, id, name, className, onChange: _onChange, errors, ...props }, ref: Ref<HTMLTextAreaElement>): JSX.Element => {
    const describedby = `${id}--errors`;
    const [text, setText] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
      _onChange!(event.target.value as any);
    };

    return (
      <div className={styles.field}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.growWrap}>
          <div aria-hidden="true" className={styles.grower}>
            {text}
          </div>
          <textarea
            onChange={handleChange}
            className={classnames(styles.input, className)}
            ref={ref}
            aria-describedby={describedby}
            {...props}
          />
        </div>
        <Messages messages={errors} id={describedby} />
      </div>
    );
  },
);
