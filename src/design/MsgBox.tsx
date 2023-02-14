import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textSmallRegular } from "@/design/typography";
import { FunctionComponent, RefObject, useMemo } from "react";
import { EditorView } from "prosemirror-view";
import { Menubar } from "../prosemirror/Menubar";
export { LoaderAnimGeneral } from "@/design/LoaderAnimGeneral";
export { ArrowUpCircle } from "@/design/ArrowUpCircle";
export { AttachmentIcon } from "@/design/AttachmentIcon";

export const Root = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
`;

export const MessageInput = styled.input`
  ${textSmallRegular};
  background-color: ${receiverTheme.colors.gray["100"]};
  color: ${receiverTheme.colors.gray["900"]};
  border: hidden;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${receiverTheme.colors.gray["400"]};
  }

  width: 94%;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Editor = styled.div`
  width: 20rem;
  height: 3rem;
  border: none !important;
  margin: 0 !important;
`;

const Wrapper = styled.div`
  position: relative;
`;

export const ProsemirrorEditorInput: FunctionComponent<{
  viewRef: RefObject<EditorView | null>;
  isEmpty: boolean;
  onBlur: () => void;
  onFocus: () => void;
  onEnter: React.KeyboardEventHandler<HTMLDivElement>;
}> = ({ viewRef, isEmpty, onBlur, onFocus, onEnter }) => {
  return (
    <Wrapper>
      <Menubar viewRef={viewRef} open={!isEmpty} />
      <Editor
        onBlur={onBlur}
        onFocus={onFocus}
        id="editor"
        onKeyDown={onEnter}
      />
    </Wrapper>
  );
};
