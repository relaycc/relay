import {
  defaultMarkdownSerializer,
  MarkdownSerializer,
  MarkdownSerializerState,
} from "prosemirror-markdown";
import { Node } from "prosemirror-model";

const serializerMarks = {
  ...defaultMarkdownSerializer.marks,
  strikethrough: {
    open: "~~",
    close: "~~",
    mixable: true,
    escape: false,
  },
  underline: { open: "__", close: "__", mixable: true, escape: false },
};

const serializerNodes = {
  ...defaultMarkdownSerializer.nodes,
  code_block: (state: MarkdownSerializerState, node: Node) => {
    // Make sure the front matter fences are longer than any dash sequence within it
    const backticks = node.textContent.match(/`{3,}/gm);
    const fence = backticks ? backticks.sort().slice(-1)[0] + "`" : "```";
    const [head, ...rest] = node.textContent?.split(" ");

    if (
      head === "ts" ||
      head === "js" ||
      head === "tsx" ||
      head === "json" ||
      head === "py" ||
      head === "sh"
    ) {
      state.write(fence + head + (node.attrs.params || "") + "\n");
      state.text(rest.join(" "), false);
    } else {
      state.write(fence + (node.attrs.params || "") + "\n");
      state.text(node.textContent, false);
    }
    state.ensureNewLine();
    state.write(fence);
    state.closeBlock(node);
  },
};

export const mdSerializer = new MarkdownSerializer(
  serializerNodes,
  serializerMarks
);
