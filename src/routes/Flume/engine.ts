import { RootEngine } from "flume";
import config from "./config";

const engine = new RootEngine(
  config,
  (type, data) => {
    switch (type) {
      case "string":
        return data.string;
      case "boolean":
        return data.boolean;
      case "number":
        return data.number;
      case "color":
        return data.color;
      default:
        return {};
    }
  },
  (node, inputValues) => {
    switch (node.type) {
      case "string":
        return { string: inputValues.string };
      case "boolean":
        return { boolean: inputValues.boolean };
      case "number":
        return { number: inputValues.number };
      case "color":
        return { color: inputValues.color };
      case "window":
        return { width: window.innerWidth, height: window.innerHeight };
      case "addNumbers":
        return { result: inputValues.num1 + inputValues.num2 };
      case "subtractNumbers":
        return { result: inputValues.num1 - inputValues.num2 };
      case "multiplyNumbers":
        return { result: inputValues.num1 * inputValues.num2 };
      case "divideNumbers":
        return { result: inputValues.num1 / inputValues.num2 };
      default:
        return {};
    }
  }
);

export default engine;
