import { FunctionComponent, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { truncateAddress } from "@/lib/truncateAddress";
import { Avatar } from "./Avatar";
import { textMdSemiBold } from "@/design/typography";
import { ButtonPrimary } from "@/design/relay/Nav";
import { DropdownItem } from "@/design/relay/DropdownItem";
import { DropdownCard } from "@/design/relay/Nav";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { LogoutIcon } from "@/design/relay/LogoutIcon";
import { CopyIcon } from "@/design/relay/CopyIcon";

const Button = styled(ButtonPrimary)`
  min-width: 207px;
  ${textMdSemiBold}
`;

const NotConnected = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <Button
      style={{ minWidth: "207px" }}
      onClick={() => {
        if (openConnectModal === undefined) {
          throw new Error(
            "openConnectModal is undefined but isConnected is false"
          );
        } else {
          openConnectModal();
          return;
        }
      }}
    >
      Connect Wallet
    </Button>
  );
};

const Connected = ({ onClick }: { onClick: () => unknown }) => {
  const { address } = useAccount();
  return (
    <Button style={{ minWidth: "207px" }} onClick={onClick}>
      <Avatar handle={address} size="sm" onClick={() => null} />
      {truncateAddress(address || "", 8)}
    </Button>
  );
};

const Dropdown: FunctionComponent<{
  toggleDropdown: () => void;
}> = ({ toggleDropdown }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const [copied, setCopied] = useCopyToClipboard();
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, toggleDropdown]);

  return (
    <WalletRoot ref={ref}>
      <Connected onClick={toggleDropdown} />
      {}
      <WalletCard>
        <DropdownItem
          onClick={() => {
            setCopied(address || "");
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
          }}
        >
          <CopyIcon style={{ marginRight: "0.5rem" }} />
          {showCopied ? "Copied!" : "Copy Address"}
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            if (disconnectAsync === undefined) {
              throw new Error(
                "disconnect is undefined but isConnected is true"
              );
            } else {
              disconnectAsync();
              return;
            }
          }}
        >
          <LogoutIcon style={{ marginRight: "0.5rem" }} />
          Disconnect
        </DropdownItem>
      </WalletCard>
    </WalletRoot>
  );
};

const WalletRoot = styled.div`
  position: relative;

  ${DropdownItem}:hover > ${LogoutIcon} {
    stroke: ${(p) => p.theme.colors.primary["500"]};
  }

  ${DropdownItem}:hover > ${CopyIcon} {
    stroke: ${(p) => p.theme.colors.primary["500"]};
  }
`;

const WalletCard = styled(DropdownCard)`
  position: absolute;
  z-index: 1;
  width: 207px;
`;

export const ConnectButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      setShowDropdown(false);
    }
  }, [isConnected, setShowDropdown]);

  if (!isConnected) {
    return <NotConnected />;
  } else {
    if (!showDropdown) {
      return <Connected onClick={() => setShowDropdown(true)} />;
    } else {
      return <Dropdown toggleDropdown={() => setShowDropdown(false)} />;
    }
  }
};
