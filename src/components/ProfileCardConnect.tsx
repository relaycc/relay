import {
  isEnsName,
  isEthAddress,
  isLensName,
  useEnsAvatar,
} from "@relaycc/receiver";
import { useConnect, useAccount, useNetwork } from "wagmi";
import Blockies from "react-blockies";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { IconSwap } from "./IconSwap";
import { IconWallet } from "./IconWallet";
import { IconNetwork } from "./IconNetwork";
import { useRouter } from "next/router";
import { IconUser } from "./IconUser";
import { useState } from "react";

export const ProfileCardConnect = () => {
  const router = useRouter();
  const connectModal = useConnectModal();
  const accountModal = useAccountModal();
  const chainModal = useChainModal();
  const account = useAccount();
  const network = useNetwork();
  const ensAvatar = useEnsAvatar({ handle: account.address });
  const [input, setInput] = useState<string | null>(null);
  const [inputIsError, setInputIsError] = useState(false);

  const topLeftImage = (() => {
    if (!(typeof account.address === "string")) {
      return <div className="p-0 bg-gray-300 w-40 h-40 rounded-md" />;
    } else {
      if (typeof ensAvatar.avatar !== "string") {
        return <div className="p-0 bg-gray-300 w-40 h-40 rounded-md" />;
      } else if (typeof ensAvatar.avatar === "string") {
        return (
          <button className="flex justify-center items-center p-0 w-40 h-40 rounded-md border-none outline-none">
            {/* eslint-disable-next-line */}
            <img
              className="rounded-md"
              src={ensAvatar.avatar}
              alt="ENS avatar"
            />
          </button>
        );
      } else {
        return (
          <Blockies
            seed={account.address.toLocaleLowerCase()}
            size={22}
            scale={5}
            className="rounded-md"
          />
        );
      }
    }
  })();

  return (
    <div className="w-80 flex flex-col shadow-lg hover:shadow-xl rounded-md bg-secondary gap-4 p-4">
      <div className="flex flex-row justify-between">
        {topLeftImage}
        <button
          onClick={() => router.push("/")}
          className="flex justify-center items-center p-0 btn btn-ghost btn-white-100 bg-white w-[5rem] h-[5rem] rounded-md"
        >
          {/* eslint-disable-next-line */}
          <img className="h-[4rem] w-[4rem]" src={"/Relay.png"} alt="logo" />
        </button>
      </div>
      <button
        onClick={
          account.isConnected
            ? accountModal.openAccountModal
            : connectModal.openConnectModal
        }
        className="btn btn-primary w-full border-none rounded-m"
      >
        <div className="flex flex-row flex-grow items-center justify-between">
          {account.isConnected && typeof account.address === "string"
            ? account.address.slice(0, 8) + "..." + account.address.slice(-4)
            : "Connect Your Wallet"}
          {account.isConnected ? (
            <IconSwap onClick={() => null} />
          ) : (
            <IconWallet />
          )}
        </div>
      </button>
      <button
        onClick={chainModal.openChainModal}
        className="btn btn-accent w-full border-none rounded-md"
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
        onClick={() => null}
        className="btn btn-accent w-full border-none rounded-md mt-auto"
      >
        <div className="flex flex-row items-center flex-grow justify-between">
          {account.isConnected ? "Your Relay Profile" : "Not Connected"}
        </div>
        <IconUser />
      </button>
      <form
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
          className={`input w-full max-w-xs ${inputIsError && "input-error"}`}
          onChange={(e) => {
            e.preventDefault();
            setInputIsError(false);
            setInput(e.target.value);
          }}
          value={input || ""}
        />
      </form>
    </div>
  );
};
