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
import { IconSearch } from "./icons/IconSearch";

export const NavBarConversations = () => {
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
    <nav className="flex xs:items-center gap-4 mb-8 xs:flex-col">
      <div className="flex w-full bg-yellow-500">
      <div className="flex justify-between flex-row-reverse w-full md:flex xs:hidden">
        <form
          className="relative w-full align-"
          onSubmit={(e) => {
            e.preventDefault();
            if (isLensName(input) || isEnsName(input) || isEthAddress(input)) {
              console.log(router.pathname);
              if (router.pathname === "/conversations") {
                launch(input);
              } else {
                router.push("/u/" + input);
              }
              setInput(null);
            } else {
              setInputIsError(true);
            }
          }}
        >
          {/* <div className="bg-pink-500"> */}
            <div className="w-full bg-green-500 flex align-end">
            <input
              type="text"
              placeholder="Enter ENS, Lens, or ETH Address"
              className={`focus:outline-none border-[3px] border-black bg-gray-100 h-12 p-5 rounded-lg md:w-3/4 xs:w-full ${
                inputIsError && "focus:border-2 focus:border-red-200"
              }`}
              onChange={(e) => {
                e.preventDefault();
                setInputIsError(false);
                setInput(e.target.value);
              }}
              value={input || ""}
            />
            </div>
            <div className="absolute right-[16px] top-0 h-full flex flex-col justify-center">
              <IconSearch />
            </div>
          {/* </div> */}
        </form>
        {/* <div className={"hidden xs:flex"}> */}
        <ul className="flex items-center gap-x-2 bg-yellow-500">
          <li>
            <Twitter />
          </li>
          <li>
            <Github />
          </li>
          <li>
            <Discord />
          </li>
          <li>
            <Mirror />
          </li>
        </ul>
      </div>
      <div className="flex gap-5 ml-auto bg-blue-500">
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
          className={`btn btn-ghost bg-accent w-[319px] md:w-64 border-none rounded-md xs:w-auto bg-red-500`}
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
      </div>
    </nav>
  );
};
