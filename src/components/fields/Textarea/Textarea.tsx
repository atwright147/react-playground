import classnames from 'classnames';
import { ChangeEvent, ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref, useState } from 'react';
import styles from './Textarea.module.scss';

// https://stackoverflow.com/a/66810748/633056

export interface Props extends ComponentPropsWithRef<'textarea'> {
  label: string,
  handle?: ReactNode,
}

export const Textarea: FC<Props> = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, handle, className, onChange: _onChange, ...props }, ref: Ref<HTMLTextAreaElement>): JSX.Element => {
    const [text, setText] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
      _onChange!(event.target.value as any);
    }

    return (
      <div className={styles.field}>
        <div className={styles.growWrap}>
          <div aria-hidden="true" className={styles.grower}>{text}</div>
          <textarea
            onChange={handleChange}
            className={classnames(styles.input, className)}
            ref={ref}
            {...props}
          />
        </div>
        <label htmlFor={props.id}>{label}</label>
      </div>
    )
  }
)
