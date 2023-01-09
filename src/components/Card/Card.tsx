import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

interface Props {
  children: ReactNode,
  to: string,
}

export const Card: FC<Props> = ({ children, to }): JSX.Element => (
  <Link className={styles.card} to={to}>
    {children}
  </Link>
);
