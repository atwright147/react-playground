import type { FC } from 'react';
import styles from './Messages.module.scss';

interface Props {
  messages: any;
  id: string;
}

export const Messages: FC<Props> = ({ messages, id }): JSX.Element | null => (
  <div className={styles.container} id={id}>
    {messages?.message && (
      <p className={styles.message} key={messages?.message}>
        {messages?.message}
      </p>
    )}
  </div>
);
