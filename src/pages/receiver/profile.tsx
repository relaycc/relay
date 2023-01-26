import styled from "styled-components";
import { useState, useCallback } from "react";
import { EthAddress, useStopClient, useXmtpClient } from "@relaycc/xmtp-hooks";
import { textSmallRegular } from "@/design/typography";
import { LogoPicture } from "@/design/LogoPicture";
import { Logo } from "@/design/Logo";
import * as Connected from "@/design/ENSID";
import { useConnectedWallet } from "@/hooks/useConnectedWallet";
import { Avatar } from "@/components/Avatar";
import * as Toast from "@/design/Toast";
import { useRelayId } from "@/hooks/useRelayId";
import { isEnsName } from "@/lib/isEnsName";
import { useRedirectWhenNotSignedIn } from "@/hooks/useRedirectWhenNotSignedInt";
import * as XmtpStatus from "@/design/XmtpStatus";
import * as Header from "@/design/HeaderSimple";
import { FooterNav } from "@/components/FooterNav";
import { truncateAddress } from "@/lib/truncateAddress";

const Receiver = styled.div`
  height: 700px;
  width: 400px;
  border-radius: 4px;
  margin: 6rem auto;
  box-shadow: 0px 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 1rem 0 1rem;
  min-width: 0;
  flex-grow: 1;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  width: 380px;
  margin-top: auto;
`;

const Description = styled.div`
  ${textSmallRegular};
  color: #4236c7;
  text-align: center;
`;

const LogoWrapper = styled.div``;

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

const ToastPosition = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function Profile() {
  const { connectedWallet } = useConnectedWallet();
  const [showFailureToast, setShowFailureToast] = useState<boolean>(false);
  const relayId = useRelayId({ handle: connectedWallet?.address });

  const triggerFailureToast = useCallback(() => {
    setShowFailureToast(true);

    setTimeout(() => {
      setShowFailureToast(false);
    }, 3000);
  }, []);

  const clearFailureToast = useCallback(() => {
    setShowFailureToast(false);
  }, [setShowFailureToast]);

  const { mutate: signOut, isLoading: isSigningOut } = useStopClient({
    onError: triggerFailureToast,
  });

  const xmtpClient = useXmtpClient({
    clientAddress: connectedWallet?.address as EthAddress,
  });

  useRedirectWhenNotSignedIn("/receiver/profile");

  return (
    <Receiver>
      <Header.Root>
        <Header.Title>Profile</Header.Title>
      </Header.Root>
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
            <Connected.Header>
              <Connected.Signal />
              <Connected.HeaderText>Connected as:</Connected.HeaderText>
              {connectedWallet?.address ? (
                <Connected.Badge.RootGray>
                  <Connected.Badge.LabelGray>
                    {"ETH Mainnet"}
                  </Connected.Badge.LabelGray>
                </Connected.Badge.RootGray>
              ) : (
                <Connected.Badge.LoadingDiv />
              )}
            </Connected.Header>
            <Connected.Row>
              <Avatar
                handle={connectedWallet?.address}
                onClick={() => null}
                size="md"
              />
              <Connected.UserDetails>
                <Connected.EnsNameMd>
                  {(() => {
                    if (isEnsName(relayId.ens.data)) {
                      return relayId.ens.data;
                    } else if (relayId.ens.isLoading) {
                      return "Loading...";
                    } else {
                      return connectedWallet?.address;
                    }
                  })()}
                </Connected.EnsNameMd>
                {connectedWallet?.address ? (
                  <Connected.AddressHeader.Root>
                    <Connected.AddressHeader.Container>
                      {truncateAddress(connectedWallet.address)}
                    </Connected.AddressHeader.Container>
                  </Connected.AddressHeader.Root>
                ) : (
                  <Connected.AddressHeader.Root>
                    <Connected.AddressHeader.LoadingDiv />
                  </Connected.AddressHeader.Root>
                )}
              </Connected.UserDetails>
              <Connected.Copy
                style={{
                  marginLeft: "auto",
                  marginTop: "auto",
                  marginBottom: "0.65rem",
                }}
              />
              <Connected.LinkIcon />
            </Connected.Row>
          </Connected.Root>
          <XmtpStatus.Root>
            <XmtpStatus.Row>
              <XmtpStatus.XmtpIcon />
              <XmtpStatus.RowItem>
                <XmtpStatus.XmtpTitleWrapper>
                  <XmtpStatus.XmtpTitle>Signed In To XMTP</XmtpStatus.XmtpTitle>
                  <XmtpStatus.XmtpVersion>
                    @xmtp/xmtp-js x7.7.1
                  </XmtpStatus.XmtpVersion>
                </XmtpStatus.XmtpTitleWrapper>
              </XmtpStatus.RowItem>
              {connectedWallet?.address ? (
                <XmtpStatus.Badge.RootPurple>
                  <XmtpStatus.Badge.DotIconPurple />
                  <XmtpStatus.Badge.LabelPurple>
                    {"DEV"}
                  </XmtpStatus.Badge.LabelPurple>
                </XmtpStatus.Badge.RootPurple>
              ) : (
                <XmtpStatus.Badge.LoadingDiv />
              )}
              <XmtpStatus.IconWrapper>
                <XmtpStatus.LogoutIcon
                  onClick={() => {
                    signOut({
                      clientAddress: xmtpClient?.data?.address() as EthAddress,
                    });
                  }}
                />
              </XmtpStatus.IconWrapper>
            </XmtpStatus.Row>
          </XmtpStatus.Root>
        </SignupSection>
      </Container>
      <FooterNav />
      {showFailureToast && (
        <ToastPosition>
          <Toast.Failure.Card
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Toast.Failure.AlertIcon />
            <Toast.Failure.Column>
              <Toast.Failure.Title>Sign-In Failed</Toast.Failure.Title>
              <Toast.Failure.Subtitle>Please try again.</Toast.Failure.Subtitle>
            </Toast.Failure.Column>
            <Toast.Failure.ExitIcon onClick={clearFailureToast} />
          </Toast.Failure.Card>
        </ToastPosition>
      )}
    </Receiver>
  );
}
