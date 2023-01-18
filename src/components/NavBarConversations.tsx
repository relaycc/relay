import {
  isEnsName,
  isEthAddress,
  isLensName,
  useLaunch,
} from "@relaycc/receiver";
import { useState } from "react";
import { useRouter } from "next/router";
import { IconSwap } from "./icons/IconSwap";
import { IconWallet } from "./icons/IconWallet";
import { IconNetwork } from "./icons/IconNetwork";
import { Discord } from "./icons/Discord";
import { Twitter } from "./icons/Twitter";
import { Github } from "./icons/Github";
import { Mirror } from "./icons/Mirror";
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import { IconSearch } from "./icons/IconSearch";
import Image from "next/image";
import Link from "next/link";

interface NavbarConversationsProps {
  handleAddressSearch: (e: string) => unknown;
}

export const NavBarConversations = ({
  handleAddressSearch,
}: NavbarConversationsProps) => {
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
    <nav className="xl:flex items-end grid grid-cols-2 gap-4 mb-6 mt-5">
      <div className="hover:cursor-pointer sm:w-[164px] min-h-[47px] w-[125px] xl:min-w-[174px] relative top-[4px] md:top-[3px]">
        <Link href="/">
          <Image src={"/relaylogo.svg"} alt={"Relay"} layout="fill" />
        </Link>
      </div>

      <div className="w-full flex justify-end order-3 col-span-2">
        <form
          className="relative xl:w-3/4 w-full"
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
            className={`focus:outline-none border-[3px] border-[#DAD8F6] bg-gray-100 h-12 p-5 rounded-lg w-full pr-12 ${
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

      <div className="flex justify-end items-center gap-4 xl:order-3 order-2 ml-6 md:w-auto xs:w-full">
      <ul className="ml-auto flex items-center font-bold gap-4 text-indigo-900 mr-2 min-w-24">
          <a
            className="text-xl hidden md:flex hover:underline"
            href={"https://twitter.com/relay_eth"}
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a 
            className="xs:hidden sm:flex md:hidden hover:underline"
            href="https://twitter.com/relay_eth" target="_blank" rel="noreferrer">
            <Twitter />
          </a>
          <a
            className="text-xl hidden md:flex hover:underline"
            href={"https://discord.gg/relaycc"}
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
          <a 
            className="sm:hidden sm:flex md:hidden hover:underline"
            href="https://discord.gg/relaycc" target="_blank" rel="noreferrer">
            <Discord />
          </a>
          <a
            className="text-xl hidden md:flex hover:underline"
            href={"https://mirror.xyz/relaycc.eth"}
            target="_blank"
            rel="noreferrer"
          >
            Mirror
          </a>
          <a 
            className="sm:hidden md:hidden hover:underline"
            href="https://mirror.xyz/relaycc.eth" target="_blank" rel="noreferrer">
            <Mirror />
          </a>
          <a 
            className="xs:hidden sm:flex hover:underline"
            href="https://github.com/relaycc" target="_blank" rel="noreferrer">
            <Github />
          </a>
        </ul>
        <button
          onClick={
            account.isConnected
              ? accountModal.openAccountModal
              : connectModal.openConnectModal
          }
          className={`btn bg-[#857EEA] hover:bg-[#2f24c4] lg:w-[319px] border-none rounded-md text-white`}
        >
          <div className="flex flex-row flex-grow items-center justify-between bg-#2f24c4">
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
