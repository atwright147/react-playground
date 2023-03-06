import { FlumeConfig, Colors, Controls } from "flume";

const colorOptions = [
  "TOMATO",
  "MEDIUMSLATEBLUE",
  "PALEGREEN",
  "HONEYDEW",
  "PLUM",
  "BLACK",
  "WHITE"
].map(c => ({
  value: c.toLowerCase(),
  label: `${c[0]}${c.slice(1).toLowerCase()}`
}));

const config = new FlumeConfig();
config
  .addPortType({
    type: "string",
    name: "string",
    label: "Text",
    color: Colors.green,
    controls: [Controls.text({ label: "Text", name: "string" })]
  })
  .addPortType({
    type: "boolean",
    name: "boolean",
    label: "Boolean",
    color: Colors.blue,
    controls: [Controls.checkbox({ label: "Boolean", name: "boolean" })]
  })
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.red,
    controls: [Controls.number({ label: "Number", name: "number" })]
  })
  .addPortType({
    type: "color",
    name: "color",
    label: "Color",
    color: Colors.pink,
    controls: [
      Controls.select({
        label: "Colors",
        name: "color",
        options: colorOptions,
        placeholder: "[Select a Color]"
      })
    ]
  })
  .addNodeType({
    type: "string",
    label: "Text",
    initialWidth: 150,
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: "boolean",
    label: "Boolean",
    initialWidth: 110,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    initialWidth: 140,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addNodeType({
    type: "color",
    label: "Color",
    initialWidth: 160,
    inputs: ports => [ports.color()],
    outputs: ports => [ports.color()]
  })
  .addNodeType({
    type: "output",
    label: "Website Attributes",
    initialWidth: 160,
    root: true,
    inputs: ports => [
      ports.string({ name: "title", label: "Title" }),
      ports.string({ name: "subtitle", label: "Subtitle" }),
      ports.color({ name: "background", label: "Background Color" }),
      ports.number({
        name: "flumeWidth",
        label: "Flume Width",
        noControls: true
      }),
      ports.number({
        name: "flumeHeight",
        label: "Flume Height",
        noControls: true
      })
    ]
  })
  .addNodeType({
    type: "window",
    label: "Window",
    initialWidth: 140,
    outputs: ports => [
      ports.number({ label: "Width", name: "width" }),
      ports.number({ label: "Height", name: "height" })
    ]
  })
  .addNodeType({
    type: "addNumbers",
    label: "Add Numbers",
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number({ name: "result" })]
  })
  .addNodeType({
    type: "subtractNumbers",
    label: "Subtract Numbers",
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number({ name: "result" })]
  })
  .addNodeType({
    type: "divideNumbers",
    label: "Divide Numbers",
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number({ name: "result" })]
  })
  .addNodeType({
    type: "multiplyNumbers",
    label: "Multiply Numbers",
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number({ name: "result" })]
  });

export default config;
