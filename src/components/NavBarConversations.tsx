import {
  isEnsName,
  isEthAddress,
  isLensName,
  useLaunch,
} from "@relaycc/receiver";
import { FunctionComponent, useState } from "react";
import { IconSwap } from "./icons/IconSwap";
import { IconWallet } from "./icons/IconWallet";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { IconSearch } from "./icons/IconSearch";
import Image from "next/image";
import { Discord } from "./icons/Discord";
import { Twitter } from "./icons/Twitter";
import { Github } from "./icons/Github";
import { Mirror } from "./icons/Mirror";
import Link from "next/link";

interface NavbarConversationsProps {
  handleAddressSearch: (e: string) => unknown;
}

export const NavBarConversations = ({
  handleAddressSearch,
}: NavbarConversationsProps) => {
  const connectModal = useConnectModal();
  const accountModal = useAccountModal();
  const account = useAccount();
  const [input, setInput] = useState<string | null>(null);
  const [inputIsError, setInputIsError] = useState(false);
  const launch = useLaunch();

  return (
    <div className="fixed left-0 right-0 bg-white">
      <nav className="flex items-center mt-0 bg-white p-6 rounded-lg">
        <div className="sm:w-[164px] min-h-[47px] w-[125px] xl:min-w-[174px] relative top-[4px] md:top-[3px]">
          <Image src={"/relaylogo.svg"} alt={"Relay"} layout="fill" />
        </div>

        <form
          className="relative ml-12 mr-12 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (isLensName(input) || isEnsName(input) || isEthAddress(input)) {
              launch(input);
              handleAddressSearch(input);
              setInput(null);
            } else {
              setInputIsError(true);
            }
          }}
        >
          <input
            type="text"
            placeholder="Enter ENS, Lens, or ETH Address"
            className={`hover:bg-gray-200 focus:bg-gray-200 focus:outline-none border-[3px] border-black bg-gray-100 h-12 p-5 rounded-lg w-full pr-12 ${
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
        <ul className="ml-auto flex items-center gap-4 mr-4 min-w-32">
          <a
            className="text-xl hover:underline"
            href={"https://twitter.com/relay_eth"}
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a
            className="text-xl hover:underline"
            href={"https://discord.gg/DTMKf63ZSf"}
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
          <a
            className="text-xl hover:underline"
            href={"https://mirror.xyz/relaycc.eth"}
            target="_blank"
            rel="noreferrer"
          >
            Blog
          </a>
          <a href="https://github.com/relaycc" target="_blank" rel="noreferrer">
            <Github />
          </a>
        </ul>

        <button
          onClick={
            account.isConnected
              ? accountModal.openAccountModal
              : connectModal.openConnectModal
          }
          className={`btn btn-ghost bg-accent lg:w-[240px] border-none rounded-md ml-0 hover:bg-orange-200`}
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
    </div>
  );
};
