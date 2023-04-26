import {
  Edge,
  Node,
  HandleProps,
  NodeTypes,
} from 'reactflow';
import { Data } from '../../../routes/ReactFlowRoute/ReactFlowRoute';

export class Engine {
  graph;
  rootNode;
  executionPaths
  // fireNodeFunction;
  // resolveInputControls;
  loops;
  maxLoops;

  constructor(graph) {
    this.graph = graph;
    this.rootNode;
    this.executionPaths;
    // this.fireNodeFunction = fireNodeFunction;
    // this.resolveInputControls = resolveInputControls;
    this.loops = 0;
    this.maxLoops = 1000;
  }

  execute() {
    this.getRootNode();
  }

  getRootNode() {
    const rootNodes = this.graph.nodes.filter((node) => node.data.root);

    if (rootNodes.length === 0) {
      throw new Error('No root node found');
    }

    if (rootNodes.length > 1) {
      throw new Error('More than one root node found');
    }

    this.rootNode = rootNodes[0];
  }

  getRootHandleEdges() {
    const rootEdges = this.graph.edges.filter((edge) => edge.target === this.rootNode.id);
    return rootEdges;
  }
}
