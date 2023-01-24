import styled from "styled-components";
import {receiverTheme} from "@/design/receiverTheme";
import {textSmallRegular} from "@/design/typography";

export {LoaderAnimGeneral} from "@/design/LoaderAnimGeneral";
export * as ArrowUpCircle from "@/design/ArrowUpCircle";


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

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;