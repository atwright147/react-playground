import classnames from 'classnames';
import { FC } from 'react';
import { Handle, HandleProps } from 'reactflow';

import styles from './node.module.scss';

interface CustomHandleProps extends HandleProps {
  label?: string,
  valueType?: string;
}

export const CustomHandle: FC<CustomHandleProps> = ({ id, label, type, position, valueType = 'any' }): JSX.Element => {
  return (
    <div className={classnames(styles.handleWithLabel, {
      [styles.source]: type === 'source',
      [styles.target]: type === 'target',
    })}>
      <div className={styles.handleLabel}>{label}</div>
      <Handle
        type={type}
        position={position}
        className={classnames(styles.handleSource, {
          [styles.number]: valueType === 'number',
          [styles.string]: valueType === 'string',
          [styles.boolean]: valueType === 'boolean',
        })}
        id={id}
      />
    </div>
  );
}

