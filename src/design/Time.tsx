import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textXsRegular } from "@/design/typography";

const Root = styled.div`
  ${textXsRegular};
  color: ${receiverTheme.colors.gray["400"]};
  letter-spacing: 0.03em;
  display: flex;
  width: 100%;

  height: 0.75rem;
`;

const LoadingDiv = styled.div`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  border-radius: 6px;
  height: 0.75rem;

  min-width: 3.5rem;
  max-width: 30%;
`;

export const Time = ({
  isLoading,
  time,
}: {
  isLoading: boolean;
  time: string;
}) => {
  if (isLoading) {
    return <LoadingDiv />;
  }
  return <Root>{time}</Root>;
};
