import { FC, ReactNode } from 'react';
import styles from './Fieldset.module.scss';

interface Props {
  children: ReactNode,
  legend: string,
}

export const Fieldset: FC<Props> = ({ children, legend }): JSX.Element => (
  <fieldset className={styles.fieldset}>
    <legend className={styles.legend}>{legend}</legend>

    {children}
  </fieldset>
);
