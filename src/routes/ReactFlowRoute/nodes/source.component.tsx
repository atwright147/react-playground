import { type FC, useCallback } from 'react';
import { Node, type NodeProps, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import { CustomHandle } from './custom-handle.component';

import '@reactflow/node-resizer/dist/style.css';
import styles from './node.module.scss';
import type { Data } from '../ReactFlowRoute';

export const SourceNode: FC<NodeProps<Data>> = (props): JSX.Element => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      {props.data.resizable && <NodeResizer minWidth={200} />}

      <div className={styles.node} style={{ minWidth: '200px' }}>
        <header
          className={styles.header}
          style={{
            backgroundColor: props.data.headerBackground,
            color: props.data.headerForeground,
          }}
        >
          <h1 className={styles.heading}>{props.data.label}</h1>
        </header>

        <div className={styles.body}>
          <div className={styles.handles}>
            {props.data.handles &&
              props.data.handles.map((handle) => (
                <CustomHandle
                  key={handle.id}
                  label={handle.label}
                  id={handle.id}
                  type={handle.type}
                  position={handle.type === 'source' ? Position.Right : Position.Left}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
