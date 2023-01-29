import styled from "styled-components";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import * as Nav from "@/design/relay/Nav";
import { truncateAddress } from "@/lib/truncateAddress";
import { Avatar } from "./Avatar";
import { textMdSemiBold } from "@/design/typography";
import { ButtonPrimary } from "@/design/relay/Nav";

const Root = styled(ButtonPrimary)`
  min-width: 207px;
  ${textMdSemiBold}
`;

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  return (
    <Root
      style={{ minWidth: "207px" }}
      onClick={() => {
        if (isConnected) {
          if (disconnectAsync === undefined) {
            throw new Error("disconnect is undefined but isConnected is true");
          } else {
            disconnectAsync();
            return;
          }
        } else {
          if (openConnectModal === undefined) {
            throw new Error(
              "openConnectModal is undefined but isConnected is false"
            );
          } else {
            openConnectModal();
            return;
          }
        }
      }}
    >
      {isConnected && typeof address === "string" && (
        <Avatar handle={address} size="sm" onClick={() => null} />
      )}
      {(() => {
        if (typeof address !== "string" || !isConnected) {
          return "Connect Wallet";
        } else {
          return truncateAddress(address, 8);
        }
      })()}
    </Root>
  );
};
