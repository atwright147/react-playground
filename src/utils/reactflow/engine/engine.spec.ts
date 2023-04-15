import { beforeEach, describe, expect, it } from 'vitest'

import { RootEngine } from './engine.js';
import { klona } from 'klona';
// import ReactFlow, {
//   addEdge,
//   applyEdgeChanges,
//   applyNodeChanges,
//   Background,
//   Controls,
//   Edge,
//   Node,
//   OnConnect,
//   OnEdgesChange,
//   OnNodesChange,
//   ReactFlowInstance,
//   ReactFlowProvider,
//   useReactFlow,
//   HandleProps,
//   NodeTypes,
// } from 'reactflow';
// import { TextUpdaterNode } from '../../../routes/ReactFlowRoute/nodes/text-updater.component.ts';
// import { SourceNode } from '../../../routes/ReactFlowRoute/nodes/source.component.ts';

const DATA = {
  "nodes": [
      {
          "width": 200,
          "height": 166,
          "id": "source",
          "type": "source",
          "position": {
              "x": 50,
              "y": 200
          },
          "data": {
              "minWidth": 250,
              "resizable": false,
              "label": "Source",
              "headerForeground": "white",
              "headerBackground": "green",
              "handles": [
                  {
                      "id": "1",
                      "label": "top",
                      "type": "source"
                  },
                  {
                      "id": "2",
                      "label": "middle",
                      "type": "source"
                  },
                  {
                      "id": "3",
                      "label": "bottom",
                      "type": "source"
                  },
                  {
                      "id": "4",
                      "label": "bottom2",
                      "type": "source"
                  },
                  {
                      "id": "5",
                      "label": "Bottom3",
                      "type": "source"
                  }
              ]
          },
          "positionAbsolute": {
              "x": 50,
              "y": 200
          }
      },
      {
          "width": 200,
          "height": 166,
          "id": "target",
          "type": "target",
          "position": {
              "x": 300,
              "y": 200
          },
          "data": {
              "minWidth": 250,
              "resizable": false,
              "label": "Target",
              "root": true,
              "headerBackground": "green",
              "headerForeground": "white",
              "handles": [
                  {
                      "id": "1",
                      "label": "top",
                      "type": "target"
                  },
                  {
                      "id": "2",
                      "label": "middle",
                      "type": "target"
                  },
                  {
                      "id": "3",
                      "label": "bottom",
                      "type": "target"
                  },
                  {
                      "id": "4",
                      "label": "bottom2",
                      "type": "target"
                  },
                  {
                      "id": "5",
                      "label": "Bottom3",
                      "type": "target"
                  }
              ]
          },
          "positionAbsolute": {
              "x": 300,
              "y": 200
          }
      },
      {
          "width": 200,
          "height": 118,
          "id": "concatenate",
          "type": "concatenate",
          "position": {
              "x": 550,
              "y": 200
          },
          "data": {
              "minWidth": 250,
              "resizable": false,
              "label": "Concatenate",
              "headerBackground": "blue",
              "headerForeground": "white",
              "handles": [
                  {
                      "id": "1",
                      "label": "Value 1",
                      "type": "target"
                  },
                  {
                      "id": "2",
                      "label": "Value 2",
                      "type": "target"
                  },
                  {
                      "id": "3",
                      "label": "Output",
                      "type": "source"
                  }
              ]
          },
          "positionAbsolute": {
              "x": 550,
              "y": 200
          }
      },
      {
          "width": 200,
          "height": 96,
          "id": "text-1",
          "type": "textUpdater",
          "position": {
              "x": 50,
              "y": 50
          },
          "data": {
              "label": "Value",
              "headerBackground": "purple",
              "headerForeground": "white",
              "value": "Hello",
              "valueType": "number"
          },
          "positionAbsolute": {
              "x": 50,
              "y": 50
          }
      },
      {
          "width": 200,
          "height": 96,
          "id": "text-2",
          "type": "textUpdater",
          "position": {
              "x": 50,
              "y": 400
          },
          "data": {
              "label": "Value",
              "headerBackground": "purple",
              "headerForeground": "white",
              "value": "world",
              "valueType": "string"
          },
          "positionAbsolute": {
              "x": 50,
              "y": 400
          }
      }
  ],
  "edges": [],
  "viewport": {
      "x": 0,
      "y": 0,
      "zoom": 1
  }
}

// const nodeTypes = {
//   textUpdater: TextUpdaterNode,
//   source: SourceNode,
//   target: SourceNode,
//   concatenate: SourceNode,
// };

describe('RootEngine', () => {
  describe('getRootNode()', () => {
    let EngineInstance;
    let testData;

    beforeEach(() => {
      EngineInstance = new RootEngine({ nodeTypes: {} }, {}, {});
      testData = klona(DATA);
    });

    describe('given one root node', () => {
      it('should return the root node', () => {
        expect(EngineInstance.getRootNode(testData.nodes)).toEqual(testData.nodes[1]);
      });
    });

    describe('given no root node', () => {
      it('should throw', () => {
        testData.nodes[1].data.root = false;
        expect(() => EngineInstance.getRootNode(testData.nodes)).toThrow();
      });
    });

    describe('given more than one root node', () => {
      it('should throw', () => {
        testData.nodes[0].data.root = true;
        expect(() => EngineInstance.getRootNode(testData.nodes)).toThrow();
      });
    });
  });
});
