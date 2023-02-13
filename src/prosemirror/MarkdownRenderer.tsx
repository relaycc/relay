import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { PreviewRenderer } from "./PreviewRenderer";
import styled from "styled-components";
import { spaceMonoMdBold } from "@/design/typography";
import remarkGemoji from "remark-gemoji";
import emoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeProps } from "react-markdown/lib/ast-to-react";

SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("sh", bash);

export const MarkdownRenderer: FunctionComponent<{ content: string }> = ({
  content,
}) => {
  const MarkdownComponents = {
    a: (props: React.LinkHTMLAttributes<HTMLAnchorElement>) => (
      <PreviewRenderer {...props} />
    ),
    p: (props: React.PropsWithChildren) => <div {...props} />,
    strong: (props: React.PropsWithChildren) => <Bold {...props} />,
    code: ({ className, ...props }: React.PropsWithChildren<CodeProps>) => {
      const match = /language-(\w+)/.exec(className || "");

      return match ? (
        <SyntaxHighlighter
          // @ts-ignore
          style={vs}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          useInlineStyles={true}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm, remarkGemoji, [emoji, { emoticon: true }]]}
      components={MarkdownComponents}
    />
  );
};

const Bold = styled.div`
  ${spaceMonoMdBold}
`;
