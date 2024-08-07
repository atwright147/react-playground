import { type FC, useCallback, useState } from 'react';
import { type NodeProps, Position, useReactFlow } from 'reactflow';
import type { Data } from '../ReactFlowRoute';
import { CustomHandle } from './custom-handle.component';

import styles from './node.module.scss';

export const TextUpdaterNode: FC<NodeProps<Data>> = (props): JSX.Element => {
  const instance = useReactFlow();
  const [value, setValue] = useState(props.data.value as string);
  console.info(props);

  const onChange = useCallback((evt) => {
    setValue(evt.target.value);
    instance.setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              value: evt.target.value,
            },
          };
        }
        return node;
      }),
    );
  }, []);

  return (
    <>
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
          <div className={styles.node}>
            <div className={styles.field}>
              <input aria-label={props.data.label} name="text" onChange={onChange} value={value} className="nodrag" />
            </div>
          </div>
          <div className={styles.handles}>
            <CustomHandle label={props.data.label} id={props.id} type="source" position={Position.Right} valueType={props.data.valueType} />
          </div>
        </div>
      </div>
    </>
  );
};
