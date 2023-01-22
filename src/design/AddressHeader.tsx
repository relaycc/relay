import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { spaceMonoXsRegular } from "@/design/typography";

const Root = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled.div`
  ${spaceMonoXsRegular};
  color: ${receiverTheme.colors.gray["500"]};
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

  width: 5.625rem;
`;

export const AddressHeader = ({
  isLoading,
  addressHeader,
}: {
  isLoading: boolean;
  addressHeader: string;
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
      <Container>
        {addressHeader.slice(0, 5)}...
        {addressHeader.slice(addressHeader.length - 4, Infinity)}
      </Container>
    </Root>
  );
};
