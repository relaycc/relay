import styled from "styled-components";
export { Compose } from "@/design/Compose";
import { receiverTheme } from "@/design/receiverTheme";
import { displayXsBold } from "@/design/typography";
export { Avatar } from "@/components/Avatar";

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 5.5rem;
  border-bottom: 1px solid ${receiverTheme.colors.gray['200']};
  background-color: #ffffff;

  width: 100%;
`;

export const Title = styled.div`
  ${displayXsBold};
  color: ${receiverTheme.colors.gray['900']};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 0.75rem;
`;
