import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {textMdRegular} from "@/lib/design/wip/typography";


const Root = styled.div`
  display: flex;

  width: 100%;
`;

const Container = styled.div`
  ${textMdRegular};
  color: ${receiverTheme.colors.gray["400"]};
`;

const LoadingDiv = styled.div`
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
  border-radius: 6px;
  height: 1rem;

  width: 14rem;
`;

export const MsgPreview = ({isLoading, msg}: { isLoading: boolean, msg: string }) => {

    if (isLoading) {
        return (
            <Root>
                <LoadingDiv/>
            </Root>
        )
    }
    return (
        <Root>
            <Container>{msg}</Container>
        </Root>
    )
}