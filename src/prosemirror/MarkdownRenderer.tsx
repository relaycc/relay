import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { PreviewRenderer } from "./PreviewRenderer";
import styled from "styled-components";
import { spaceMonoMdBold } from "@/design/typography";
import remarkGemoji from "remark-gemoji";
import emoji from "remark-emoji";

export const MarkdownRenderer: FunctionComponent<{ content: string }> = ({
  content,
}) => {
  console.log("markdown renderer", { content });
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGemoji, [emoji, { emoticon: true }]]}
      components={{
        a: (props) => <PreviewRenderer {...props} />,
        p: (props) => <div {...props} />,
        strong: (props) => <Bold {...props} />,
      }}
    />
  );
};

const Bold = styled.div`
  ${spaceMonoMdBold}
`;
