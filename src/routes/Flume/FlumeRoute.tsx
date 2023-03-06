import { useState } from "react";
import { NodeEditor, useRootEngine } from "flume";
import config from "./config";
import engine from "./engine";
import styles from './FlumeRoute.module.scss';
import { Preview } from '../../components/Preview/Preview';

export const FlumeRoute = () => {
  const [nodes, setNodes] = useState({});
  const {
    title,
    subtitle,
    background,
    flumeWidth,
    flumeHeight
  } = useRootEngine(nodes, engine);

  return (
    <div className={styles.wrapper} style={{ background }}>
      <div className={styles.header}>
        <h1>{title || "Welcome to Flume"}</h1>
        <h2>{subtitle || "Start editing to see some magic happen!"}</h2>
      </div>

      <div
        className={styles.nodeEditor}
        style={{
          width: flumeWidth || '100%',
          height: flumeHeight || '100%',
          overflow: "hidden"
        }}
      >
        <NodeEditor
          nodeTypes={config.nodeTypes}
          portTypes={config.portTypes}
          nodes={nodes}
          onChange={nodes => setNodes(nodes)}
          defaultNodes={[{ type: "output", x: 200, y: -130 }]}
        />
      </div>

      <div className={styles.preview}>
        {/* @ts-ignore */}
        <Preview data={useRootEngine(nodes, engine)} />
      </div>
    </div>
  );
}
