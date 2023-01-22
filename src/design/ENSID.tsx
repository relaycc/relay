import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
export { StatusIcon } from "@/design/StatusIcon";
export { AddressHeader } from "@/design/AddressHeader";
export { Badge } from "@/design/Badge";
export { Copy } from "@/design/Copy";
export { LinkIcon } from "@/design/LinkIcon";
import { textXsMedium } from "@/design/typography";
export * from "@/design/ENSName";

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${receiverTheme.colors.success["50"]};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  height: 5.375rem;
  row-gap: 0.5rem;
`;

export const Row = styled.div`
  display: flex;
  column-gap: 1rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
`;

export const Signal = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${receiverTheme.colors.success["500"]};
`;

export const HeaderText = styled.div`
  ${textXsMedium};
  color: ${receiverTheme.colors.success["500"]};
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 0.5rem;
  height: 2.5rem;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
