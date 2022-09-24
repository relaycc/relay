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
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";

export const NavBar = () => {
  const [input, setInput] = useState<string | null>(null);
  const [inputIsError, setInputIsError] = useState(false);
  const connectModal = useConnectModal();
  const accountModal = useAccountModal();
  const chainModal = useChainModal();
  const network = useNetwork();
  const account = useAccount();
  const launch = useLaunch();
  const router = useRouter();

  return (
    <nav className="flex flex-col-reverse md:flex-row xs:items-center gap-4 mb-8">
      {/* eslint-disable-next-line */}
      {/* <img
        src={"/Relay.png"}
        alt="Relay Logo"
        className="hidden lg:block invisibleh-[4rem] w-[4rem] rounded-full mr-auto"
      /> */}
      <form
        className="relative w-full md:w-[336px]"
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
          className={`focus:outline-none border-[3px] border-black bg-gray-100 h-12 p-5 rounded-lg w-full pr-12 ${
            inputIsError && "focus:border-2 focus:border-red-200"
          }`}
          onChange={(e) => {
            e.preventDefault();
            setInputIsError(false);
            setInput(e.target.value);
          }}
          value={input || ""}
        />
        <div className="absolute right-[16px] top-0 h-full flex flex-col justify-center">
          <IconSearch />
        </div>
      </form>
      <div className="flex justify-end items-center gap-4 ml-auto">
        <button
          onClick={chainModal.openChainModal}
          className={`hidden sm:flex btn btn-ghost bg-accent w-40 border-none rounded-md`}
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
          className={`btn btn-ghost bg-accent w-[319px] md:w-64 border-none rounded-md`}
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
