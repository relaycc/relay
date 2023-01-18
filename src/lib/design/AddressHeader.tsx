import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {spaceMonoXsRegular} from "@/lib/design/wip/typography";


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
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
  border-radius: 6px;
  height: 0.75rem;
  
  width: 5.625rem;
`;

export const AddressHeader = ({isLoading, addressHeader}: {isLoading: boolean, addressHeader: string}) => {

    if (isLoading){
        return (
            <Root>
                <LoadingDiv />
            </Root>
        )
    }
    return(
        <Root>
            <Container>{addressHeader.substring(0, 5)}...{addressHeader.substr(-4,4)}</Container>
        </Root>
    )
}