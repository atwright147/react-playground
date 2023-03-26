import { FC, useCallback } from 'react';
import { Handle, HandleProps, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import styles from './node.module.scss';
import classnames from 'classnames';

interface CustomHandleProps extends HandleProps {
  label?: string,
}

const CustomHandle: FC<CustomHandleProps> = ({ id, label, type }): JSX.Element => {

  return (
    <div className={classnames(styles.handleWithLabel, {
      [styles.source]: type === 'source',
      [styles.target]: type === 'target',
    })}>
      <div className={styles.handleLabel}>{label}</div>
      <Handle
        type={type}
        position={Position.Right}
        className={styles.handleSource}
        id={id}
      />
    </div>
  );
}

export const SourceNode = ({ data }) => {
  console.info(data);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      {data.resizable && <NodeResizer minWidth={200} />}

      <div className={styles.node} style={{ minWidth: '200px' }}>
        <header className={styles.header} style={{ backgroundColor: data.headerColor }}>
          <h1 className={styles.heading}>{data.label}</h1>
        </header>

        <div className={styles.body}>
          <div className={styles.handles}>
            {data.handles.map((handle) => (
              <CustomHandle
                key={handle.id}
                label={handle.label}
                id={handle.id}
                type={handle.type}
                position={Position.Right}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
