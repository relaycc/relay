import styled from "styled-components";
import { useState, useCallback, useEffect } from "react";
import { EthAddress, useStartClient, useXmtpClient } from "@relaycc/xmtp-hooks";
import { useRouter } from "next/router";
import { textSmallRegular } from "@/design/typography";
import { LogoPicture } from "@/design/LogoPicture";
import { Logo } from "@/design/Logo";
import * as Init from "@/design/InitializeXmtp";
import * as Connected from "@/design/ENSID";
import * as Toast from "@/design/Toast";
import { useConnectedWallet } from "@/hooks/useConnectedWallet";
import { Avatar } from "@/components/Avatar";
import { useRelayId } from "@/hooks/useRelayId";
import { isEnsName } from "@/lib/isEnsName";
import { truncateAddress } from "@/lib/truncateAddress";
import { motion } from "framer-motion";
import {
  useReceiverWindow,
  useRedirectWhenSignedIn,
} from "@/hooks/useReceiverWindow";

export const Window = styled(motion.div)`
  position: fixed;
  overflow: hidden;
  right: 6rem;
  bottom: 1rem;
  margin: 0;
  padding: 0;
  box-shadow: 0px 4px 32px rgba(16, 24, 40, 0.12);
`;

export const Receiver = styled(motion.div)`
  width: 400px;
  height: 700px;
  border-radius: 14px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
  padding: 3rem 1rem;
  min-width: 0;
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
`;

const Description = styled.div`
  ${textSmallRegular};
  color: #4236c7;
  text-align: center;
`;

const ToastPosition = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 1rem;
`;

export const Login = () => {
  const { connectedWallet } = useConnectedWallet();
  const [showFailureToast, setShowFailureToast] = useState<boolean>(false);
  const { page, setPage } = useReceiverWindow();
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

  const { mutate: signIn, isLoading: isSigningIn } = useStartClient({
    onError: triggerFailureToast,
    onSuccess: () => {
      if (page?.id !== "sign") {
        throw new Error("On login page, but page id is not 'login");
      } else {
        setPage(page.redirect || { id: "messages" });
      }
    },
  });

  useRedirectWhenSignedIn();

  return (
    <Receiver>
      <Container>
        <LogoSection>
          <Logo style={{ marginBottom: "2.813rem" }} />
          <LogoPicture style={{ marginBottom: "0.625rem" }} />
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
            </Connected.Row>
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
                  if (
                    connectedWallet === undefined ||
                    connectedWallet === null
                  ) {
                    return;
                  } else {
                    signIn({
                      wallet: connectedWallet,
                      opts: { env: "production" },
                    });
                  }
                }}
              >
                {isSigningIn ? "Signin In..." : "Sign-in with XMTP"}
                {isSigningIn && <Init.Spinner />}
              </Init.Button>
            </Init.ButtonWrapper>
          </Init.Root>
        </SignupSection>
      </Container>
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
};
