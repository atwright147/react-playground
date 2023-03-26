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
  HandleProps,
} from 'reactflow';
import { Button } from '../../components/Button/Button';
import { TextUpdaterNode } from './nodes/text-updater.component';
import { SourceNode } from './nodes/source.component';

import 'reactflow/dist/style.css';
import styles from './ReactFlowRoute.module.scss';

interface HandleConfig extends Partial<HandleProps> {
  label: string,
}

interface Data {
  label?: string,
  headerColor?: string,
  handles?: HandleConfig[]
  minWidth?: number,
  resizable?: boolean,
  value?: unknown,
}

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  source: SourceNode,
};

const initialNodes: Node<Data>[] = [
  {
    id: 'source',
    type: 'source',
    position: { x: 50, y: 200 },
    data: {
      minWidth: 250,
      resizable: false,
      label: 'Wibble',
      headerColor: 'green',
      handles: [
        {
          id: '1',
          label: 'top',
          type: 'target',
        },
        {
          id: '2',
          label: 'middle',
          type: 'source',
        },
        {
          id: '3',
          label: 'bottom',
          type: 'source',
        },
        {
          id: '4',
          label: 'bottom2',
          type: 'source',
        },
        {
          id: '5',
          label: 'Bottom3',
          type: 'source',
        },
      ],
    }
  },
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
    position: { x: 350, y: 200 },
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
