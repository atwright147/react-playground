import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

import styles from './node.module.scss';

const handleStyle = { left: 10 };

export const TextUpdaterNode = ({ data }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={styles.node}>
        <div className={styles.field}>
          <label htmlFor="text">Text:</label>
          <input id="text" name="text" onChange={onChange} className="nodrag" />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </>
  );
}
