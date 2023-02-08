import { Schema } from "prosemirror-model";
import { schema } from "prosemirror-markdown";
import {
  defaultSettings,
  ImagePluginSettings,
  updateImageNode,
} from "prosemirror-image-plugin";

const marks = schema.spec.marks.addToEnd("del", {
  parseDOM: [
    { tag: "del" },
    {
      style: "text-decoration",
      getAttrs: (value) => value == "line-through" && null,
    },
  ],
  toDOM() {
    return ["del"];
  },
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
  }),
  marks: sch.spec.marks,
});

export const defaultSchema = imageSchema;
