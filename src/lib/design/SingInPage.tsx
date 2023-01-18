import styled from "styled-components";
import { FunctionComponent } from "react";
import { InitializeXmtp } from "@/lib/design/InitializeXmtp";
import { textSmallRegular } from "@/lib/design/wip/typography";
import { LogoPicture } from "@/lib/design/LogoPicture";
import { Logo } from "@/lib/design/Logo";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 1rem;
  width: 100%;
  height: 100%;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Description = styled.div`
  ${textSmallRegular};
  color: #4236c7;
  text-align: center;
`;


const LogoWrapper = styled.div`
  margin-bottom: 2.813rem;
`;

const LogoPictureWrapper = styled.div`
  margin-bottom: 0.625rem;
`
const LogoWithBottomSpacing = () => (
  <LogoWrapper><Logo/></LogoWrapper>
)

const LogoPictureWithSpacing = () => (
  <LogoPictureWrapper><LogoPicture/></LogoPictureWrapper>
)

export const SignInPage: FunctionComponent = () => {
  return (
    <Container>
      <LogoSection>
        <LogoWithBottomSpacing/>
        <LogoPictureWithSpacing />
        <Description>
          Bring your encrypted conversations & self-sovereign web3 identity
          <b> everywhere you go.</b>
        </Description>
      </LogoSection>
      <SignupSection>
        <div style={{height: "100px", border: "1px solid black", width: "100%"}}/>
        <InitializeXmtp isWalletConnected={false} hasConnected={false} isLoading={false} handleSignin={()=>null}/>
      </SignupSection>
    </Container>
  );
};
