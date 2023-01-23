import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textMdRegular } from "@/design/typography";

const Root = styled.div`
  display: flex;

  width: 100%;
`;

const Container = styled.div`
  ${textMdRegular};
  color: ${receiverTheme.colors.gray["400"]};
`;

const LoadingDiv = styled.div`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  border-radius: 6px;
  height: 1rem;

  width: 14rem;
`;

export const MsgPreview = ({
  isLoading,
  msg,
}: {
  isLoading: boolean;
  msg: string;
}) => {
  if (isLoading) {
    return (
      <Root>
        <LoadingDiv />
      </Root>
    );
  }
  return (
    <Root>
      <Container>{msg}</Container>
    </Root>
  );
};
