import React, { FunctionComponent, useCallback } from "react";
import styled from "styled-components";
import { toggleMark } from "prosemirror-commands";
import { MarkType } from "prosemirror-model";
import { EditorView } from "prosemirror-view";

import { BoldIcon } from "../design/BoldIcon";
import { ItalicIcon } from "../design/ItalicIcon";
import { StrikethroughIcon } from "../design/StrikethroughIcon";
import { CodeIcon } from "../design/CodeIcon";
import { defaultSchema } from "./defaultSchema";
import { useIsMarkActive } from "./useIsMarkActive";
import { EditorState, Transaction } from "prosemirror-state";

const Root = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  gap: 1rem;
  height: 3rem;
  width: auto;
  position: absolute;
  top: -2rem;
  left: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray["25"]};
  border: 1px solid ${({ theme }) => theme.colors.gray["200"]};
  padding: 0.25rem 0.5rem;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
`;

export const Menubar: FunctionComponent<{
  viewRef: React.RefObject<EditorView | null>;
  open: boolean;
}> = ({ viewRef, open }) => {
  const onMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
  }, []);

  if (!viewRef.current || !viewRef.current.state.selection) {
    return null;
  }

  return (
    <Root open={open}>
      <MarkIcon
        state={viewRef.current?.state}
        mark={defaultSchema.marks.strong}
        icon={BoldIcon}
        dispatch={viewRef.current?.dispatch}
        onMouseDown={onMouseDown}
      />
      <MarkIcon
        state={viewRef.current?.state}
        mark={defaultSchema.marks.em}
        icon={ItalicIcon}
        dispatch={viewRef.current?.dispatch}
        onMouseDown={onMouseDown}
      />
      <MarkIcon
        state={viewRef.current?.state}
        mark={defaultSchema.marks.strikethrough}
        icon={StrikethroughIcon}
        dispatch={viewRef.current?.dispatch}
        onMouseDown={onMouseDown}
      />
      <MarkIcon
        state={viewRef.current?.state}
        mark={defaultSchema.marks.code}
        icon={CodeIcon}
        dispatch={viewRef.current?.dispatch}
        onMouseDown={onMouseDown}
      />
    </Root>
  );
};

const IconWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background: ${({ isActive, theme }) => isActive && theme.colors.gray["200"]};
  cursor: pointer;

  path {
    stroke: ${({ isActive, theme }) =>
      isActive ? "#344054" : theme.colors.primary["100"]};
  }

  :hover {
    background: ${({ theme }) => theme.colors.gray["100"]};
  }
`;

const MarkIcon: FunctionComponent<{
  state: EditorState;
  dispatch: (tr: Transaction) => void;
  mark: MarkType;
  icon: string;
  onMouseDown?: (event: React.MouseEvent) => void;
}> = ({ state, mark, icon: IconSVG, dispatch, onMouseDown }) => {
  const isActive = useIsMarkActive(mark, state);

  const toggle = useCallback(
    (mark: MarkType) => {
      if (!state || !dispatch) {
        return;
      }
      toggleMark(mark)(state, dispatch);
    },
    [mark, state, dispatch]
  );

  return (
    <IconWrapper
      onMouseDown={onMouseDown}
      isActive={isActive}
      onClick={() => toggle(mark)}
    >
      <IconSVG />
    </IconWrapper>
  );
};
