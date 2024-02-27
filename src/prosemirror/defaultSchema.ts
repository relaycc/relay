import { Schema } from "prosemirror-model";
import { schema } from "prosemirror-markdown";
import {
  defaultSettings,
  ImagePluginSettings,
  updateImageNode,
} from "prosemirror-image-plugin";

const marks = schema.spec.marks.addToEnd("strikethrough", {
  attrs: {
    markType: { default: "strikethrough" },
  },
  inclusive: false,
  parseDOM: [
    { tag: "s" },
    { tag: "strike" },
    { tag: "del" },
    {
      style: "text-decoration",
      getAttrs: (value) => value == "line-through" && null,
    },
  ],
  toDOM: () => ["s", 0],
});

const sch = new Schema({
  nodes: schema.spec.nodes,
  marks,
});

export const imageSettings: ImagePluginSettings = {
  ...defaultSettings,
  isBlock: false,
  hasTitle: false,
  enableResize: false,
  createOverlay: () => undefined,
};

const imageSchema = new Schema({
  nodes: updateImageNode(sch.spec.nodes, {
    ...imageSettings,
  }).update("code_block", {
    content: "text*",
    group: "block",
    code: true,
    defining: true,
    marks: "",
    attrs: { params: { default: "" } },
    parseDOM: [
      {
        tag: "pre",
        preserveWhitespace: "full",
        getAttrs: (node) => ({
          params: (node as HTMLElement).getAttribute("data-params") || "",
        }),
      },
    ],
    toDOM(node) {
      return [
        "pre",
        node.attrs.params
          ? { "data-params": node.attrs.params, className: "ts" }
          : { className: "ts" },
        ["code", 0],
      ];
    },
  }),
  marks: sch.spec.marks,
});

export const defaultSchema = imageSchema;
