import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

import styles from './node.module.scss';

const handleStyle = { left: 10 };

export const SourceNode = ({ data }) => {
  console.info(data);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div className={styles.node} style={{ minWidth: `${data.minWidth}px`}}>
        <header>
          <h1 className={styles.heading}>Source</h1>
        </header>

        <div className={styles.handles}>
          {data.handles.map((handle, index) => (
            <div className={styles.handle}>
              <div className={styles.handleLabel}>{handle.label}</div>
              <Handle
                type="source"
                position={Position.Right}
                className={styles.handleSource}
                id={handle.id}
                key={handle.id}
              />
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
