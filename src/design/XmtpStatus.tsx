import styled, { css } from "styled-components";
export { XmtpIcon } from "@/design/XmtpIcon";
import { spaceMonoXsRegular, textMdSemiBold } from "@/design/typography";
export { LogoutIcon } from "@/design/LogoutIcon";
export * as Badge from "@/design/Badge";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem 1rem;
  border-radius: ${(props) => props.theme.radius.m};
  background-color: ${(props) => props.theme.colors.primary["100"]};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;

  svg {
    min-width: 40px;
  }
`;

export const RowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const XmtpTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
`;

export const XmtpTitle = styled.div`
  ${textMdSemiBold};
`;

export const XmtpVersion = styled.div`
  ${spaceMonoXsRegular};
  color: ${(props) => props.theme.colors.gray["500"]};
`;
