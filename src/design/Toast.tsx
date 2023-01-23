import { Component, ComponentProps, FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { textSmallRegular, textSmallBold } from "./typography";
import { motion } from "framer-motion";

const card = css`
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

const CardFailure = styled(motion.div)`
  ${card};
  background-color: ${(props) => props.theme.colors.error["100"]};
  border-color: ${(props) => props.theme.colors.error["600"]};
`;

const CardSuccess = styled(motion.div)`
  ${card};
  background-color: ${(props) => props.theme.colors.success["100"]};
  border-color: ${(props) => props.theme.colors.success["400"]};
`;

const CardInfo = styled(motion.div)`
  ${card};
  background-color: ${(props) => props.theme.colors.secondary["100"]};
  border-color: ${(props) => props.theme.colors.primary["500"]};
`;

const CardWarning = styled(motion.div)`
  ${card};
  background-color: ${(props) => props.theme.colors.warning["100"]};
  border-color: ${(props) => props.theme.colors.warning["400"]};
`;

const title = css`
  margin: 0;
  padding: 0;
  ${textSmallBold};
`;

const TitleFailure = styled.h3`
  ${title};
  color: ${(props) => props.theme.colors.error["600"]};
`;

const TitleSuccess = styled.h3`
  ${title};
  color: ${(props) => props.theme.colors.success["700"]};
`;

const TitleInfo = styled.h3`
  ${title};
  color: ${(props) => props.theme.colors.primary["700"]};
`;

const TitleWarning = styled.h3`
  ${title};
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

const AlertIcon = styled((props: ComponentProps<"svg">) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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

const ExitIcon = styled((props: ComponentProps<"svg">) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
})`
  cursor: pointer;
  width: 24px;
  height: 24px;
  stroke: ${(props) => props.theme.colors.gray["700"]};
`;

export const Failure = {
  Card: CardFailure,
  Title: TitleFailure,
  AlertIcon: AlertIconFailure,
  Column,
  Subtitle,
  ExitIcon,
};

export const Success = {
  Card: CardSuccess,
  Title: TitleSuccess,
  AlertIcon: AlertIconSuccess,
  Column,
  Subtitle,
  ExitIcon,
};

export const Info = {
  Card: CardInfo,
  Title: TitleInfo,
  AlertIcon: AlertIconInfo,
  Column,
  Subtitle,
  ExitIcon,
};

export const Warning = {
  Card: CardWarning,
  Title: TitleWarning,
  AlertIcon: AlertIconWarning,
  Column,
  Subtitle,
  ExitIcon,
};
