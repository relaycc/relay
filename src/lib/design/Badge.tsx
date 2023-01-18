import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {textXsMedium} from "@/lib/design/wip/typography";


const Root = styled.div`
  display: flex;

  width: 100%;
`;

const Container = styled.div`
  ${textXsMedium};
  color: ${receiverTheme.colors.gray["700"]};
  border-radius: 16px;
  background-color: ${receiverTheme.colors.gray["100"]};
  padding: 2px 8px;
  height: 1.125rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingDiv = styled.div`
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
  border-radius: 16px;
  height: 1.375rem;

  width: 5.75rem;
`;

export const Badge = ({isLoading, label}: { isLoading: boolean, label: string }) => {

    if (isLoading) {
        return (
            <Root>
                <LoadingDiv/>
            </Root>
        )
    }
    return (
        <Root>
            <Container>{label}</Container>
        </Root>
    )
}