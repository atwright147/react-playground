import classnames from 'classnames';
import { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref, useState } from 'react';
import styles from './Textarea.module.scss';

// https://stackoverflow.com/a/66810748/633056

export interface Props extends ComponentPropsWithRef<'textarea'> {
  label: string,
  handle?: ReactNode,
}

export const Textarea: FC<Props> = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, handle, className, ...props }, ref: Ref<HTMLTextAreaElement>): JSX.Element => {
    const [text, setText] = useState<string>('');

    return (
      <div className={styles.field}>
        <div className={styles.growWrap}>
          <div aria-hidden="true" className={styles.grower}>{text}</div>
          <textarea
            onChange={(event) => setText(event.target.value)}
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
