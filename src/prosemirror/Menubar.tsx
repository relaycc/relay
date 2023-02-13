import React, { FunctionComponent, useCallback } from "react";
import styled from "styled-components";
import { toggleMark } from "prosemirror-commands";
import { MarkType } from "prosemirror-model";
import { EditorView } from "prosemirror-view";

import { defaultSchema } from "./defaultSchema";

const Root = styled.div`
  display: flex;
  gap: 1rem;
  height: 2rem;
  width: 10rem;
`;

const Button = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  border-radius: 4px;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Menubar: FunctionComponent<{
  viewRef: React.RefObject<EditorView | null>;
}> = ({ viewRef }) => {
  console.log({ viewRef });
  const toggle = useCallback((markType: MarkType) => {
    if (
      !viewRef?.current ||
      !viewRef.current?.state ||
      !viewRef.current?.dispatch
    ) {
      return;
    }
    toggleMark(markType)(viewRef.current.state, viewRef.current.dispatch);
  }, []);

  return (
    <Root>
      <Button onClick={() => toggle(defaultSchema.marks.strong)}>bold</Button>
      <Button onClick={() => toggle(defaultSchema.marks.em)}>italic</Button>
      <Button onClick={() => toggle(defaultSchema.marks.code)}>code</Button>
      <Button onClick={() => toggle(defaultSchema.marks.strikethrough)}>
        striketrough
      </Button>
      <Button onClick={() => toggle(defaultSchema.marks.del)}>link</Button>
    </Root>
  );
};
