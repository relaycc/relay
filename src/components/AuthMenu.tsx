import { Logo } from "@/design/Logo";
import styled from "styled-components";
import { motion } from "framer-motion";
import { EthAddress, useStartClient } from "@relaycc/xmtp-hooks";
import * as CloseIcon from "@/design/CloseIcon";
import { isEnsName } from "@/lib/isEnsName";
import * as Connected from "@/design/ENSID";
import { useRelayId } from "@/hooks/useRelayId";
import { Avatar } from "@/components/Avatar";
import { useStopClient, useXmtpClient } from "@relaycc/xmtp-hooks";
import { useAccount, useSigner } from "wagmi";
import * as InitializeXmtp from "@/design/InitializeXmtp";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Signer } from "ethers";
import { useToggle } from "@/hooks/useReceiverWindow";

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  backdrop-filter: blur(4px);
`;

const Root = styled(motion.div)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  box-shadow: 0 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px 14px 8px 8px;
  padding: 1rem;
  background: #ffffff;
  overflow: hidden;
`;

const Close = styled(CloseIcon.CloseIcon)`
  align-self: flex-end;
`;

const L = styled(Logo)`
  width: 200px;
`;

const FlexRowWide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: auto;
`;

export const AuthMenu = ({ doClose }: { doClose: () => unknown }) => {
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const xmtpClient = useXmtpClient({
    clientAddress: address as EthAddress,
  });
  const toggle = useToggle();
  const isActuallyConnected =
    isConnected &&
    signer !== undefined &&
    signer !== null &&
    typeof address === "string";
  const isSignedIn =
    xmtpClient.data !== null &&
    xmtpClient.data !== undefined &&
    xmtpClient.data.address() === address;

  return (
    <Overlay>
      <Root
        key="newMessage"
        initial={{ maxHeight: "0" }}
        animate={{ maxHeight: "376px" }}
        exit={{ maxHeight: "0" }}
        transition={{ duration: 0.2 }}
      >
        <FlexRowWide>
          <L />
          <Close
            onClick={() => {
              if (!isSignedIn) {
                toggle(null);
              } else {
                doClose();
              }
            }}
          />
        </FlexRowWide>
        {!isActuallyConnected && <NotConnected />}
        {isActuallyConnected && <ConnectedStatus address={address} />}
        {isActuallyConnected && !isSignedIn && (
          <ActuallyConnected
            onSignIn={() => {
              doClose();
            }}
            signer={signer}
          />
        )}
        {isActuallyConnected && isSignedIn && (
          <XmtpEnabled clientAddress={address as EthAddress} />
        )}
      </Root>
    </Overlay>
  );
};

const NotConnected = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <InitializeXmtp.Root>
      <InitializeXmtp.Row>
        <InitializeXmtp.Alert />
        <InitializeXmtp.RowItem>
          <InitializeXmtp.Title>Connect Wallet</InitializeXmtp.Title>
          <InitializeXmtp.Subtitle>
            To enable XMTP, first connect a wallet.
          </InitializeXmtp.Subtitle>
        </InitializeXmtp.RowItem>
      </InitializeXmtp.Row>
      <InitializeXmtp.ButtonWrapper>
        <InitializeXmtp.Button
          onClick={() => {
            if (openConnectModal === undefined) {
              // should show a toast
              console.error(
                "openConnectModal is undefined even though isConnected is false"
              );
            } else {
              openConnectModal();
            }
          }}
        >
          Connect
        </InitializeXmtp.Button>
      </InitializeXmtp.ButtonWrapper>
    </InitializeXmtp.Root>
  );
};

const ConnectedStatus = ({ address }: { address: string }) => {
  const relayId = useRelayId({ handle: address });
  return (
    <Connected.Root>
      <Connected.Header>
        <Connected.Signal />
        <Connected.HeaderText>Connected as:</Connected.HeaderText>
      </Connected.Header>
      <Connected.Row>
        <Avatar handle={address} onClick={() => null} size="md" />
        <Connected.UserDetails>
          <Connected.EnsNameMd>
            {(() => {
              if (isEnsName(relayId.ens.data)) {
                return relayId.ens.data;
              } else if (relayId.ens.isLoading) {
                return "Loading...";
              } else {
                return address;
              }
            })()}
          </Connected.EnsNameMd>
          <Connected.AddressHeader.Root>
            <Connected.AddressHeader.Container>
              {address.slice(0, 5)}...
              {address.slice(address.length - 4, Infinity)}
            </Connected.AddressHeader.Container>
          </Connected.AddressHeader.Root>
        </Connected.UserDetails>
      </Connected.Row>
    </Connected.Root>
  );
};

const ActuallyConnected = ({
  signer,
  onSignIn,
}: {
  signer: Signer;
  onSignIn: () => unknown;
}) => {
  const { mutate: signIn, isLoading: isSigningIn } = useStartClient({
    onSuccess: onSignIn,
  });
  return (
    <>
      <InitializeXmtp.Root>
        <InitializeXmtp.Row>
          <InitializeXmtp.Xmtp />
          <InitializeXmtp.RowItem>
            <InitializeXmtp.Title>Enable XMTP</InitializeXmtp.Title>
            <InitializeXmtp.Subtitle>
              Sign in to XMTP to send and receive messages from any ETH address.
            </InitializeXmtp.Subtitle>
          </InitializeXmtp.RowItem>
        </InitializeXmtp.Row>
        <InitializeXmtp.ButtonWrapper>
          <InitializeXmtp.Button
            onClick={() => {
              if (isSigningIn) {
                return;
              } else {
                signIn({ wallet: signer, opts: { env: "production" } });
              }
            }}
          >
            {!isSigningIn && "Enable"}
            {isSigningIn && "Signing In..."}
            {isSigningIn && <InitializeXmtp.Spinner />}
          </InitializeXmtp.Button>
        </InitializeXmtp.ButtonWrapper>
      </InitializeXmtp.Root>
    </>
  );
};

const XmtpEnabled = ({ clientAddress }: { clientAddress: string }) => {
  const { mutate: signOut, isLoading: isSigningOut } = useStopClient({});
  return (
    <InitializeXmtp.Root>
      <InitializeXmtp.Row>
        <InitializeXmtp.Xmtp />
        <InitializeXmtp.RowItem>
          <InitializeXmtp.Title>XMTP Enabled!</InitializeXmtp.Title>
          <InitializeXmtp.Subtitle>
            {"You're signed into the XMTP production network."}
          </InitializeXmtp.Subtitle>
        </InitializeXmtp.RowItem>
      </InitializeXmtp.Row>
      <InitializeXmtp.ButtonWrapper>
        <InitializeXmtp.Button
          onClick={() =>
            signOut({ clientAddress: clientAddress as EthAddress })
          }
        >
          Sign Out
        </InitializeXmtp.Button>
      </InitializeXmtp.ButtonWrapper>
    </InitializeXmtp.Root>
  );
};
