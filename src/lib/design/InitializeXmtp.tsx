import styled from "styled-components";
import { XmptIcon } from "@/lib/design/XmptIcon";
import { textMdSemiBold, textSmallRegular } from "@/lib/design/wip/typography";
import { ButtonView } from "@/lib/design/ButtonView";
import { LoaderAnimInitialization } from "@/lib/design/LoaderAnimInitialization";

const ComponentRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
  border-radius: ${(props) => props.theme.radius.m};
  background-color: ${(props) => props.theme.colors.primary["100"]};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`

const RowItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Title = styled.div`
    ${textMdSemiBold};
    color: ${(props) => props.theme.colors.primary["700"]};
`

const Subtitle = styled.div`
    ${textSmallRegular};
    color: ${(props) => props.theme.colors.gray["600"]};
`

const SignUpButton = styled(ButtonView)`
`

interface InitializeXmtpProps {
  hasConnected: boolean;
  isLoading: boolean;
  handleSignin: () => void;
}

export const InitializeXmtp = ({hasConnected ,isLoading, handleSignin}: InitializeXmtpProps) => {
  return (
    <ComponentRoot>
      <Row>
        <XmptIcon/>
        <RowItem>
          <Title>Initialize XMTP</Title>
          <Subtitle>Please connect with XMTP to start messaging.</Subtitle>
        </RowItem>
      </Row>
      <ButtonWrapper>
        {isLoading ? (
          <SignUpButton size="2xl" label="Signing In..." handleClick={() => null} hierarchy="primary" disabled={hasConnected} icon={<LoaderAnimInitialization/>}/>
        ) : (
          <SignUpButton size="2xl" label="Sign-in with XMTP" handleClick={handleSignin} hierarchy="primary" disabled={hasConnected}/>
          )}
      </ButtonWrapper>
    </ComponentRoot>
  )
}