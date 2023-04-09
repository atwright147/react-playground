import { FC, useCallback } from 'react';
import { NodeProps, Position } from 'reactflow';
import { Data } from '../ReactFlowRoute';
import { CustomHandle } from './custom-handle.component';

import styles from './node.module.scss';

export const TextUpdaterNode: FC<NodeProps<Data>> = (props): JSX.Element => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div className={styles.node} style={{ minWidth: '200px' }}>
        <header className={styles.header} style={{
          backgroundColor: props.data.headerBackground,
          color: props.data.headerForeground,
        }}>
          <h1 className={styles.heading}>{props.data.label}</h1>
        </header>

        <div className={styles.body}>
          <div className={styles.node}>
            <div className={styles.field}>
              <input aria-label={props.data.label} name="text" onChange={onChange} className="nodrag" />
            </div>
          </div>
          <div className={styles.handles}>
            <CustomHandle
              label={props.data.label}
              id={props.id}
              type="source"
              position={Position.Right}
              valueType={props.data.valueType}
            />
          </div>
        </div>
      </div>
    </>
  );
}
