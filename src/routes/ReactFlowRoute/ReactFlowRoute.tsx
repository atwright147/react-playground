import { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import { Button } from '../../components/Button/Button';
import { TextUpdaterNode } from './nodes/text-updater.component';

import 'reactflow/dist/style.css';
import styles from './ReactFlowRoute.module.scss';

const nodeTypes = { textUpdater: TextUpdaterNode };

const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 200 },
    data: { value: 123 }
  },
];

const initialEdges = [];

export const Flow = (): JSX.Element => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();
  const { setViewport } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.group('Saved Data');
      console.info(JSON.stringify(flow));
      console.groupEnd();
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      try {
        const req = await fetch('http://localhost:8882/flows/1');
        const flow = await req.json();
        console.info(flow);

        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      } catch (err) {
        console.info(err);
      }

      // const flow = JSON.parse(localStorage.getItem(flowKey));

    };

    restoreFlow();
  }, [setNodes, setViewport]);

  return (
    <div className={styles.container}>
      <div className={styles.flow}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={setRfInstance}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <div className={styles.preview}>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onRestore}>Restore</Button>
      </div>
    </div>
  );
};

export const ReactFlowRoute = (): JSX.Element => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
