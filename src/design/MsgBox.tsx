import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textSmallRegular } from "@/design/typography";
import { Menubar } from "@/prosemirror/Menubar";
import { FunctionComponent, RefObject } from "react";
import { EditorView } from "prosemirror-view";

export { LoaderAnimGeneral } from "@/design/LoaderAnimGeneral";
export { ArrowUpCircle } from "@/design/ArrowUpCircle";

export const Root = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 0.625rem 1rem;
  border-radius: 1.5rem;
  background-color: ${receiverTheme.colors.gray["100"]};
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ProsemirrorEditorInput: FunctionComponent<{
  viewRef: RefObject<EditorView | null>;
}> = ({ viewRef }) => {
  return (
    <Wrapper>
      <Menubar viewRef={viewRef} />
      <div
        id="editor"
        style={{
          width: "20rem",
          borderRadius: "4px",
          border: "1px solid lightgrey",
        }}
      />
    </Wrapper>
  );
};
