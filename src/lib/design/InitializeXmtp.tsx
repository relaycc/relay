import styled from "styled-components";
import { XmtpIcon } from "@/lib/design/XmtpIcon";
import { textMdSemiBold, textSmallRegular } from "@/lib/design/wip/typography";
import { ButtonPrimaryXxl, ButtonView } from "@/lib/design/ButtonView";
import { LoaderAnimInitialization } from "@/lib/design/LoaderAnimInitialization";
import { AlertCircle } from "@/lib/design/AlertCircle";

export const Button = ButtonPrimaryXxl;
export const Alert = AlertCircle;
export const Xmtp = XmtpIcon;
export const Spinner = LoaderAnimInitialization;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
  border-radius: ${(props) => props.theme.radius.m};
  background-color: ${(props) => props.theme.colors.primary["100"]};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
`;

export const Title = styled.div`
  ${textMdSemiBold};
  color: ${(props) => props.theme.colors.primary["700"]};
`;

export const Subtitle = styled.div`
  ${textSmallRegular};
  color: ${(props) => props.theme.colors.gray["600"]};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const RowItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
