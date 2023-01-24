import styled, { css } from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textXsMedium } from "@/design/typography";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.4rem;
  border-radius: 16px;
  padding: 2px 8px;
  height: 1.375rem;
  min-width: 3rem;
`;

export const RootPurple = styled(Root)`
  background-color: #f4f3ff;    //not in color palette
`

export const RootGray = styled(Root)`
  background-color: ${receiverTheme.colors.gray["100"]};
`

const Label = styled.div`
  ${textXsMedium};
`;

export const LabelPurple = styled(Label)`
  color: ${receiverTheme.colors.primary["500"]};
`

export const LabelGray = styled(Label)`
  color: ${receiverTheme.colors.gray["700"]};
`

const DotIcon = styled.div`
  min-width: 0.375rem;
  min-height: 0.375rem;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
`;

export const DotIconPurple = styled(DotIcon)`
  background-color: ${receiverTheme.colors.primary["500"]};
`

export const DotIconGray = styled(DotIcon)`
  background-color: ${receiverTheme.colors.gray["700"]};
`

export const LoadingDiv = styled.div`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  mix-blend-mode: multiply;
  border-radius: 16px;
  height: 1.375rem;

  width: 3.75rem;
`;
