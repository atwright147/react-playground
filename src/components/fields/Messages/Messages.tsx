import { FC } from 'react';
import { FieldErrors } from 'react-hook-form';
import styles from './Messages.module.scss';

interface Props {
  messages: any,
  name: string,
}

export const Messages: FC<Props> = ({ messages, name }): JSX.Element | null => (
  <div className={styles.container}>
    <p className={styles.message} key={messages?.message}>{messages?.message}</p>
  </div>
);
