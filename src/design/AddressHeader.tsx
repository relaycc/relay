import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { spaceMonoXsRegular } from "@/design/typography";

export const Root = styled.div`
  display: flex;
  width: 100%;
`;

export const Container = styled.div`
  ${spaceMonoXsRegular};
  color: ${receiverTheme.colors.gray["500"]};
  height: 0.75rem;
`;

export const LoadingDiv = styled.div`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  mix-blend-mode: multiply;
  border-radius: 6px;
  height: 0.75rem;
  width: 5.625rem;
`;