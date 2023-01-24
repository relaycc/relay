import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textSmallRegular } from "@/design/typography";
export * as Time from "@/design/Time";
export * as ENSName from "@/design/ENSName";
export { Avatar } from "@/components/Avatar";

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4.5rem;
  cursor: pointer;

  width: 100%;
  background: #ffffff;

  :hover {
    background-color: ${receiverTheme.colors.gray["200"]};
  }
  :active {
    background-color: ${receiverTheme.colors.gray["300"]};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  column-gap: 24px;

  min-width: 65%;
  max-width: 80%;
`;

export const MsgDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 70%;
`;

export const NameAndIcons = styled.div`
  display: flex;
  height: 1.5rem;
  column-gap: 4px;
  max-width: 100%;
`;

export const MessageDetails = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["400"]};
  display: flex;
  overflow: hidden;
  width: 100%;
`;

export const StyledTime = styled.div`
  display: flex;
`;
