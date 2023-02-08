import {
  defaultMarkdownSerializer,
  MarkdownSerializer,
} from "prosemirror-markdown";

const serializerMarks = {
  ...defaultMarkdownSerializer.marks,
  del: {
    open: "~",
    close: "~",
    mixable: true,
    expelEnclosingWhitespace: true,
    escape: true,
  },
};

export const mdSerializer = new MarkdownSerializer(
  defaultMarkdownSerializer.nodes,
  serializerMarks
);
