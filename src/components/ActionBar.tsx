import {
  isEnsName,
  isEthAddress,
  isLensName,
  useLaunch,
} from "@relaycc/receiver";
import { useState } from "react";
import { useRouter } from "next/router";
import { IconSearch } from "./icons/IconSearch";
import { IconSwap } from "./icons/IconSwap";
import { IconWallet } from "./icons/IconWallet";
import { IconNetwork } from "./icons/IconNetwork";
import { IconChat } from "./icons/IconChat";
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";

export const ActionBar = () => {
  const [input, setInput] = useState<string | null>(null);
  const [inputIsError, setInputIsError] = useState(false);
  const connectModal = useConnectModal();
  const accountModal = useAccountModal();
  const chainModal = useChainModal();
  const network = useNetwork();
  const account = useAccount();
  const launch = useLaunch();
  const router = useRouter();

  const sendMessagePeerAddress =
    typeof router.query.handle === "string"
      ? router.query.handle
      : "relaycc.eth";

  return (
    <nav className="flex flex-row justify-between items-center mb-8">
      <form
        className="relative w-96"
        onSubmit={(e) => {
          e.preventDefault();
          if (isLensName(input) || isEnsName(input) || isEthAddress(input)) {
            router.push("/" + input);
            setInput(null);
          } else {
            setInputIsError(true);
          }
        }}
      >
        <input
          type="text"
          placeholder="Enter ENS, Lens, or ETH Address"
          className={`focus:outline-none focus:border-2 focus:border-gray-200 bg-gray-100 h-12 p-5 rounded-lg w-full pr-12 ${
            inputIsError && "focus:border-2 focus:border-red-200"
          }`}
          onChange={(e) => {
            e.preventDefault();
            setInputIsError(false);
            setInput(e.target.value);
          }}
          value={input || ""}
        />
        <div className="absolute right-[16px] top-0 h-full flex flex-col justify-center opacity-25">
          <IconSearch />
        </div>
      </form>
      <button
        onClick={() => launch()}
        className={`btn ${
          account.isConnected ? "btn-secondary" : "btn-accent"
        }  text-black w-max border-none rounded-m`}
      >
        <div className="flex flex-row flex-grow items-center justify-between gap-8">
          Send A Message to {truncate(sendMessagePeerAddress, 20)}
          <IconChat />
        </div>
      </button>
      <div className="flex items-center gap-4">
        <button
          onClick={chainModal.openChainModal}
          className={`btn ${
            network.chain?.name ? "btn-secondary" : "btn-accent"
          } w-40 border-none rounded-md`}
        >
          <div className="flex flex-row items-center flex-grow justify-between">
            {network.chain?.name || "No Network"}
          </div>
          {account.isConnected ? (
            <IconSwap onClick={() => null} />
          ) : (
            <IconNetwork />
          )}
        </button>
        <button
          onClick={
            account.isConnected
              ? accountModal.openAccountModal
              : connectModal.openConnectModal
          }
          className={`btn ${
            network.chain?.name ? "btn-secondary" : "btn-accent"
          } w-64 border-none rounded-md`}
        >
          <div className="flex flex-row flex-grow items-center justify-between">
            {account.isConnected && typeof account.address === "string"
              ? account.address.slice(0, 8) + "..." + account.address.slice(-4)
              : "Connect A Wallet"}
            {account.isConnected ? (
              <IconSwap onClick={() => null} />
            ) : (
              <IconWallet />
            )}
          </div>
        </button>
      </div>
    </nav>
  );
};

const truncate = (str: string, length: number): string => {
  if (str.length <= length) {
    return str;
  } else {
    return str.slice(0, length) + "...";
  }
};
