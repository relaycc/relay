import styled from "styled-components";
import {textXsRegular} from "@/design/typography";
import {receiverTheme} from "@/design/receiverTheme";

export * as Time from "@/design/Time";

export const Root = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

export const Line = styled.div`
  width: 100%;
  border: 0.5px solid ${receiverTheme.colors.gray["300"]};
`;

export const NewDate = styled.div`
  ${textXsRegular};
  color: ${receiverTheme.colors.gray["300"]};
  white-space: nowrap;
  align-self: baseline;
`;
