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
import { Github } from "./icons/Github";
import { Twitter } from "./icons/Twitter";
import { Discord } from "./icons/Discord";
import { Mirror } from "./icons/Mirror";
import Link from "next/link";

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
    <nav className="xl:flex grid grid-cols-2 gap-4 mb-8">
      <div className="w-full flex justify-end order-3 col-span-2">
        <form
          className="relative xl:w-3/4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (isLensName(input) || isEnsName(input) || isEthAddress(input)) {
              router.push("/u/" + input);
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
      </div>
        <button
          onClick={
            account.isConnected
              ? accountModal.openAccountModal
              : connectModal.openConnectModal
          }
          className={`btn btn-ghost bg-accent lg:w-[319px] border-none rounded-md`}
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
    </nav>
  );
};
