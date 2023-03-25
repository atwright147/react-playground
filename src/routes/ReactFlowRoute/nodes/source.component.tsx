import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import styles from './node.module.scss';

export const SourceNode = ({ data }) => {
  console.info(data);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      {data.resizable && <NodeResizer minWidth={200} />}

      <div className={styles.node} style={{ minWidth: '200px' }}>
        <header className={styles.header}>
          <h1 className={styles.heading}>Source</h1>
        </header>

        <div className={styles.handles}>
          {data.handles.map((handle, index) => (
            <div className={styles.handleWithLabel} key={handle.id}>
              <div className={styles.handleLabel}>{handle.label}</div>
              <Handle
                type="source"
                position={Position.Right}
                className={styles.handleSource}
                id={handle.id}
              />
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
