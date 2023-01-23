import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { displayXsBold } from "@/design/typography";

export const Root = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  height: 5rem;
  border-bottom: 1px solid ${receiverTheme.colors.gray["200"]};
  background-color: #ffffff;
  width: 100%;
`;

export const Title = styled.div`
  ${displayXsBold};
  color: ${receiverTheme.colors.gray["900"]};
`;
