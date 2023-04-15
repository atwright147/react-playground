class LoopError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
  static maxLoopsExceeded = 1;
}

export class RootEngine {
  constructor(config, resolveInputControls, fireNodeFunction) {
    this.config = config;
    this.fireNodeFunction = fireNodeFunction;
    this.resolveInputControls = resolveInputControls;
    this.loops = 0;
    this.maxLoops = 1000;
  }

  resetLoops = maxLoops => {
    this.maxLoops = maxLoops !== undefined ? maxLoops : 1000;
    this.loops = 0;
  };

  checkLoops = () => {
    if (this.maxLoops >= 0 && this.loops > this.maxLoops) {
      throw new LoopError(
        "Max loop count exceeded.",
        LoopError.maxLoopsExceeded
      );
    } else {
      this.loops++;
    }
  };

  getRootNode = nodes => {
    const roots = Object.values(nodes).filter(n => n.data.root);
    if (!roots.length) {
      throw new Error("Your node graph must have one root node.");
    }
    if (roots.length > 1) {
      throw new Error("The root engine must not be called with more than one root node.");
    }
    return roots[0];
  };

  reduceRootInputs = (inputs, callback) =>
    Object.entries(inputs).reduce((obj, [inputName, connection]) => {
      const input = callback(inputName, connection);
      obj[input.name] = input.value;
      return obj;
    }, {});

  resolveInputValues = (node, nodeType, nodes, context) => {
    let inputs = nodeType.inputs;
    if (typeof inputs === "function") {
      inputs = inputs(node.inputData, node.connections, context);
    }
    return inputs.reduce((obj, input) => {
      const inputConnections = node.connections.inputs[input.name] || [];
      if (inputConnections.length > 0) {
        obj[input.name] = this.getValueOfConnection(
          inputConnections[0],
          nodes,
          context
        );
      } else {
        obj[input.name] = this.resolveInputControls(
          input.type,
          node.inputData[input.name] || {},
          context
        );
      }
      return obj;
    }, {});
  };

  getValueOfConnection = (connection, nodes, context) => {
    this.checkLoops();
    const outputNode = nodes[connection.source];
    const outputNodeType = this.config.nodeTypes[outputNode.type];
    const inputValues = this.resolveInputValues(
      outputNode,
      outputNodeType,
      nodes,
      context
    );
    const outputResult = this.fireNodeFunction(
      outputNode,
      inputValues,
      outputNodeType,
      context
    )[connection.target];
    return outputResult;
  };

  resolveRootNode(nodes, edges, options = {}) {
    const rootNode = options.rootNodeId
      ? nodes[options.rootNodeId]
      : this.getRootNode(nodes);
    if (rootNode) {
      const inputValues = rootNode.inputs.reduce(
        (obj, input) => {
          this.resetLoops(options.maxLoops);
          let value;
          const connection = edges.find(
            edge =>
              edge.target === rootNode.id &&
              edge.targetHandle === input.name
          );
          if (connection) {
            value = this.getValueOfConnection(
              connection,
              nodes,
              options.context
            );
          } else {
            value = this.resolveInputControls(
              input.type,
              rootNode.inputData[input.name] || {},
              options.context
            );
          }
          obj[input.name] = value;
          return obj;
        },
        {}
      );
      return this.fireNodeFunction(
        rootNode,
        inputValues,
        this.config.nodeTypes[rootNode.type],
        options.context
      );
    } else {
      throw new Error("No root node found.");
    }
  }
}
