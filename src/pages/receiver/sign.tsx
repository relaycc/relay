import styled from "styled-components";
import { FunctionComponent } from "react";
import { EthAddress, useStartClient, useXmtpClient } from "@relaycc/xmtp-hooks";
import { textSmallRegular } from "@/lib/design/wip/typography";
import { LogoPicture } from "@/lib/design/LogoPicture";
import { Logo } from "@/lib/design/Logo";
import * as Init from "@/lib/design/InitializeXmtp";
import * as Connected from "@/lib/design/ENSID";
import { useConnectedWallet } from "@/lib/auth/useConnectedWallet";
import { useRouter } from "next/router";

const Receiver = styled.div`
  height: 700px;
  width: 400px;
  border-radius: 4px;
  margin: 6rem auto;
  box-shadow: 0px 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px;
`;

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
`;

const LogoWithBottomSpacing = () => (
  <LogoWrapper>
    <Logo />
  </LogoWrapper>
);

const LogoPictureWithSpacing = () => (
  <LogoPictureWrapper>
    <LogoPicture />
  </LogoPictureWrapper>
);

export const SignInPage: FunctionComponent = () => {
  const signIn = useStartClient({});
  const { connectedWallet } = useConnectedWallet();
  const xmtpClient = useXmtpClient({
    clientAddress: connectedWallet?.address as EthAddress,
  });
  const router = useRouter();

  if (
    xmtpClient.data !== undefined &&
    xmtpClient.data !== null &&
    xmtpClient.data.address() === connectedWallet?.address
  ) {
    router.push("/receiver/messages");
  }

  return (
    <Receiver>
      <Container>
        <LogoSection>
          <LogoWithBottomSpacing />
          <LogoPictureWithSpacing />
          <Description>
            Bring your encrypted conversations & self-sovereign web3 identity
            <b> everywhere you go.</b>
          </Description>
        </LogoSection>
        <SignupSection>
          <Connected.Root>
            <Connected.LeftSide>
              <Connected.Header>
                <Connected.Signal />
                <Connected.HeaderText>Connected as:</Connected.HeaderText>
              </Connected.Header>
              <Connected.ConnectionContent>
                <Connected.StatusIconContainer>
                  <Connected.StatusIcon
                    size="lg"
                    isLoading={true}
                    src={
                      "https://pyxis.nymag.com/v1/imgs/f47/788/caac0f6d9bc8edc26a8c8b17d69a41e447-02-sherlock.rsquare.w330.jpg"
                    }
                  />
                </Connected.StatusIconContainer>
                <Connected.UserDetails>
                  <Connected.ENSName
                    size="md"
                    monoFont={false}
                    isLoading={false}
                    ENSname="oswin.eth"
                  />
                  <Connected.AddressHeader
                    isLoading={false}
                    addressHeader="0x123456adfadfadfa7890"
                  />
                </Connected.UserDetails>
              </Connected.ConnectionContent>
            </Connected.LeftSide>
            <Connected.RightSide>
              <Connected.Badge
                hasLoaded={false}
                label="ETH Network"
                color="purple"
                dot={false}
              />
            </Connected.RightSide>
          </Connected.Root>

          <Init.Root>
            <Init.Row>
              <Init.Xmtp />
              <Init.RowItem>
                <Init.Title>Initialize XMTP</Init.Title>
                <Init.Subtitle>
                  Please connect with XMTP to start messaging.
                </Init.Subtitle>
              </Init.RowItem>
            </Init.Row>
            <Init.ButtonWrapper>
              <Init.Button
                onClick={() => {
                  if (connectedWallet === null) {
                    return;
                  } else {
                    signIn.mutate({ wallet: connectedWallet });
                  }
                }}
              >
                {signIn.isLoading ? "Signin In..." : "Sign-in with XMTP"}
                {signIn.isLoading && <Init.Spinner />}
              </Init.Button>
            </Init.ButtonWrapper>
          </Init.Root>
        </SignupSection>
      </Container>
    </Receiver>
  );
};
