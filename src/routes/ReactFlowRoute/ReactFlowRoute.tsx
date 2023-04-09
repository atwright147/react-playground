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
  NodeTypes,
} from 'reactflow';
import { Button } from '../../components/Button/Button';
import { TextUpdaterNode } from './nodes/text-updater.component';
import { SourceNode } from './nodes/source.component';

import 'reactflow/dist/base.css';
import styles from './ReactFlowRoute.module.scss';

export interface HandleConfig extends Omit<HandleProps, 'position'> {
  label: string,
}

export interface Data {
  label?: string,
  headerForeground?: string,
  headerBackground?: string,
  handles?: HandleConfig[]
  minWidth?: number,
  resizable?: boolean,
  value?: unknown,
  valueType?: string,
}

const nodeTypes: NodeTypes = {
  textUpdater: TextUpdaterNode,
  source: SourceNode,
  target: SourceNode,
  concatenate: SourceNode,
};

const initialNodes: Node<Data>[] = [
  {
    id: 'source',
    type: 'source',
    position: { x: 50, y: 200 },
    data: {
      minWidth: 250,
      resizable: false,
      label: 'Source',
      headerForeground: 'white',
      headerBackground: 'green',
      handles: [
        {
          id: '1',
          label: 'top',
          type: 'source',
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
    id: 'target',
    type: 'target',
    position: { x: 300, y: 200 },
    data: {
      minWidth: 250,
      resizable: false,
      label: 'Target',
      headerBackground: 'green',
      headerForeground: 'white',
      handles: [
        {
          id: '1',
          label: 'top',
          type: 'target',
        },
        {
          id: '2',
          label: 'middle',
          type: 'target',
        },
        {
          id: '3',
          label: 'bottom',
          type: 'target',
        },
        {
          id: '4',
          label: 'bottom2',
          type: 'target',
        },
        {
          id: '5',
          label: 'Bottom3',
          type: 'target',
        },
      ],
    }
  },
  {
    id: 'concatenate',
    type: 'concatenate',
    position: { x: 550, y: 200 },
    data: {
      minWidth: 250,
      resizable: false,
      label: 'Concatenate',
      headerBackground: 'blue',
      headerForeground: 'white',
      handles: [
        {
          id: '1',
          label: 'Value 1',
          type: 'target',
        },
        {
          id: '2',
          label: 'Value 2',
          type: 'target',
        },
        {
          id: '3',
          label: 'Output',
          type: 'source',
        },
      ],
    }
  },
  {
    id: 'text-1',
    type: 'textUpdater',
    position: { x: 50, y: 50 },
    data: {
      label: 'Value',
      headerBackground: 'purple',
      headerForeground: 'white',
      value: 'Hello',
      valueType: 'number',
    }
  },
  {
    id: 'text-2',
    type: 'textUpdater',
    position: { x: 50, y: 400 },
    data: {
      label: 'Value',
      headerBackground: 'purple',
      headerForeground: 'white',
      value: 'world',
      valueType: 'string',
    }
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
