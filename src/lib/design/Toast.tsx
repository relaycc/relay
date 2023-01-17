import { FunctionComponent } from "react";
import styled from "styled-components";
import { textSmallRegular, textSmallBold } from "./wip/typography";

export interface ToastProps {
  variant: "success" | "error" | "warning" | "info";
  message: string;
}

export const Toast: FunctionComponent<ToastProps> = ({ variant, message }) => {
  switch (variant) {
    case "error":
      return (
        <CardFailure>
          <AlertIconFailure />
          <Column>
            <TitleFailure>Failure</TitleFailure>
            <Subtitle>{message}</Subtitle>
          </Column>
          <ExitIcon />
        </CardFailure>
      );
    case "success":
      return (
        <CardSuccess>
          <AlertIconSuccess />
          <Column>
            <TitleSuccess>Succcess</TitleSuccess>
            <Subtitle>{message}</Subtitle>
          </Column>
          <ExitIcon />
        </CardSuccess>
      );
    case "warning":
      return (
        <CardWarning>
          <AlertIconWarning />
          <Column>
            <TitleWarning>Warning</TitleWarning>
            <Subtitle>{message}</Subtitle>
          </Column>
          <ExitIcon />
        </CardWarning>
      );
    case "info":
      return (
        <CardInfo>
          <AlertIconInfo />
          <Column>
            <TitleInfo>Info</TitleInfo>
            <Subtitle>{message}</Subtitle>
          </Column>
          <ExitIcon />
        </CardInfo>
      );
    default:
      throw new Error("Invalid variant");
  }
};

const Card = styled.div`
  width: 368px;
  height: 58px;
  padding: 8px 16px 8px 16px;
  border-radius: ${(props) => props.theme.radius.m};
  border: 0.5px solid black;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardFailure = styled(Card)`
  background-color: ${(props) => props.theme.colors.error["100"]};
  border-color: ${(props) => props.theme.colors.error["600"]};
`;

const CardSuccess = styled(Card)`
  background-color: ${(props) => props.theme.colors.success["100"]};
  border-color: ${(props) => props.theme.colors.success["400"]};
`;

const CardInfo = styled(Card)`
  background-color: ${(props) => props.theme.colors.secondary["100"]};
  border-color: ${(props) => props.theme.colors.primary["500"]};
`;

const CardWarning = styled(Card)`
  background-color: ${(props) => props.theme.colors.warning["100"]};
  border-color: ${(props) => props.theme.colors.warning["400"]};
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  ${textSmallBold};
`;

const TitleFailure = styled(Title)`
  color: ${(props) => props.theme.colors.error["600"]};
`;

const TitleSuccess = styled(Title)`
  color: ${(props) => props.theme.colors.success["700"]};
`;

const TitleInfo = styled(Title)`
  color: ${(props) => props.theme.colors.primary["700"]};
`;

const TitleWarning = styled(Title)`
  color: ${(props) => props.theme.colors.warning["700"]};
`;

const Subtitle = styled.h5`
  ${textSmallRegular};
  margin: 0;
  padding: 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  margin-right: 8px;
  flex-grow: 1;
`;

const AlertIcon = styled(({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
})`
  width: 24px;
  height: 24px;
`;

const AlertIconFailure = styled(AlertIcon)`
  stroke: ${(props) => props.theme.colors.error["600"]};
`;

const AlertIconSuccess = styled(AlertIcon)`
  stroke: ${(props) => props.theme.colors.success["700"]};
`;

const AlertIconInfo = styled(AlertIcon)`
  stroke: ${(props) => props.theme.colors.primary["700"]};
`;

const AlertIconWarning = styled(AlertIcon)`
  stroke: ${(props) => props.theme.colors.warning["700"]};
`;

const ExitIcon = styled(({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
})`
  width: 24px;
  height: 24px;
  stroke: ${(props) => props.theme.colors.gray["700"]};
`;
