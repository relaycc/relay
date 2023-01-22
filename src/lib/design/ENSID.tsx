import styled from "styled-components";
import { receiverTheme } from "@/lib/design/wip/receiverTheme";
export { StatusIcon } from "@/lib/design/StatusIcon";
export { AddressHeader } from "@/lib/design/AddressHeader";
export { Badge } from "@/lib/design/Badge";
export { Copy } from "@/lib/design/Copy";
export { LinkIcon } from "@/lib/design/LinkIcon";
import { textXsMedium } from "@/lib/design/wip/typography";
export { ENSName } from "@/lib/design/ENSName";

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${receiverTheme.colors.success["50"]};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  height: 5.375rem;
  width: 380px;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
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

export const ConnectionContent = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;

  width: 100%;
`;

export const StatusIconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 2.5rem;
  height: 2.5rem;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 0.5rem;
  height: 2.5rem;
  width: 100%;
`;

export const RightSide = styled(LeftSide)`
  row-gap: 0.2rem;
  justify-content: flex-end;
  align-items: center;
  height: 3.8rem;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
