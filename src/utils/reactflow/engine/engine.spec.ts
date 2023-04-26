import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Engine } from './engine';
import { klona } from 'klona';

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
          "id": "targetId",
          "type": "target",
          "position": {
              "x": 565,
              "y": 208
          },
          "data": {
              "root": true,
              "minWidth": 250,
              "resizable": false,
              "label": "Target",
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
          "selected": false,
          "positionAbsolute": {
              "x": 565,
              "y": 208
          },
          "dragging": false
      },
      {
          "width": 200,
          "height": 118,
          "id": "concatenateId",
          "type": "concatenate",
          "position": {
              "x": 316,
              "y": 226
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
          "selected": true,
          "positionAbsolute": {
              "x": 316,
              "y": 226
          },
          "dragging": false
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
      },
      {
          "width": 200,
          "height": 96,
          "id": "text-3",
          "type": "textUpdater",
          "position": {
              "x": 50,
              "y": 500
          },
          "data": {
              "label": "Value",
              "headerBackground": "purple",
              "headerForeground": "white",
              "value": "Andy",
              "valueType": "string"
          },
          "positionAbsolute": {
              "x": 50,
              "y": 500
          }
      }
  ],
  "edges": [
      {
          "source": "concatenateId",
          "sourceHandle": "3",
          "target": "targetId",
          "targetHandle": "1",
          "id": "reactflow__edge-concatenateId3-targetId1"
      },
      {
          "source": "text-3",
          "sourceHandle": "text-3",
          "target": "targetId",
          "targetHandle": "2",
          "id": "reactflow__edge-text-3text-3-targetId2"
      },
      {
          "source": "text-2",
          "sourceHandle": "text-2",
          "target": "concatenateId",
          "targetHandle": "2",
          "id": "reactflow__edge-text-2text-2-concatenateId2"
      },
      {
          "source": "text-1",
          "sourceHandle": "text-1",
          "target": "concatenateId",
          "targetHandle": "1",
          "id": "reactflow__edge-text-1text-1-concatenateId1"
      }
  ],
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

describe('Engine', () => {
  describe('execute()', () => {
    let EngineInstance: Engine;
    let testGraph;

    beforeEach(() => {
      testGraph = klona(DATA);
      EngineInstance = new Engine(testGraph);
    });

    it('should call getRootNode()', () => {
      const getRootNodeSpy = vi.spyOn(EngineInstance, 'getRootNode')
      EngineInstance.execute();
      expect(getRootNodeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRootNode()', () => {
    let EngineInstance: Engine;
    let testGraph;

    beforeEach(() => {
      testGraph = klona(DATA);
      EngineInstance = new Engine(testGraph);
    });

    describe('given one root node', () => {
      it('should return the root node', () => {
        EngineInstance.getRootNode();
        expect(EngineInstance.rootNode).toEqual(testGraph.nodes[1]);
      });
    });

    describe('given no root node', () => {
      it('should throw', () => {
        testGraph.nodes[1].data.root = false;
        expect(() => EngineInstance.getRootNode()).toThrow();
      });
    });

    describe('given more than one root node', () => {
      it('should throw', () => {
        testGraph.nodes[0].data.root = true;
        expect(() => EngineInstance.getRootNode()).toThrow();
      });
    });
  });

  describe('getRootHandleEdges()', () => {
    let EngineInstance: Engine;
    let testGraph;

    beforeEach(() => {
      testGraph = klona(DATA);
      EngineInstance = new Engine(testGraph);
      EngineInstance.getRootNode();
    });

    describe('given some connected edges', () => {
      it('should return the connected edges', () => {
        expect(EngineInstance.getRootHandleEdges()).toHaveLength(2);
      });
    });
  });
});
