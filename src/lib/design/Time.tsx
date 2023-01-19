import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {textXsRegular} from "@/lib/design/wip/typography";


const Root = styled.div`
  display: flex;

  width: 100%;
`;

const Container = styled.div`
  ${textXsRegular};
  color: ${receiverTheme.colors.gray["400"]};
  letter-spacing: 0.03em;

  height: 0.75rem;
`;

const LoadingDiv = styled.div`
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
  border-radius: 6px;
  height: 0.75rem;

  min-width: 3.5rem;
  max-width: 30%;
`;

export const Time = ({isLoading, time}: { isLoading: boolean, time: string }) => {

    if (isLoading) {
        return (
            <Root>
                <LoadingDiv/>
            </Root>
        )
    }
    return (
        <Root>
            <Container>{time}</Container>
        </Root>
    )
}