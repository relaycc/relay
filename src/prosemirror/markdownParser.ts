import { defaultMarkdownParser, MarkdownParser } from "prosemirror-markdown";
import { defaultSchema } from "./defaultSchema";

const tokens = { ...defaultMarkdownParser.tokens, del: { mark: "del" } };

export const mdParser = new MarkdownParser(
  defaultSchema,
  defaultMarkdownParser.tokenizer,
  tokens
);
