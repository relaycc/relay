import type { NextPage } from "next";
import {
  ProfileCardLens,
  ProfileCardEns,
  ProfileCardEtherscan,
  ProfileCardPlaceholder,
  ProfileCardConnect,
} from "components";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Window } from "@relaycc/receiver";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const account = useAccount();
  const connectModal = useConnectModal();
  const [didPromptConnect, setDidPromptConnect] = useState(false);

  useEffect(() => {
    if (!account.isConnected && !didPromptConnect) {
      setDidPromptConnect(true);
      connectModal.openConnectModal && connectModal.openConnectModal();
    }
  }, [account, connectModal, didPromptConnect]);

  return (
    <main
      data-theme="retro"
      className="w-screen h-screen flex flex-row justify-center overflow-scroll bg-blue-200"
    >
      <Window />
      <div className="container mx-auto flex flex-col align-center flex-grow">
        <ul className="flex flex-row basis-1/4 flex-wrap gap-8 p-8">
          <ProfileCardConnect />
          {account.isConnected || (
            <>
              <ProfileCardPlaceholder topRightImgUrl="/ENS.svg" />
              <ProfileCardPlaceholder topRightImgUrl="/LENS LOGO_ copy_Minimal.svg" />
              <ProfileCardPlaceholder topRightImgUrl="/etherscan-logo-circle.svg" />
              <ProfileCardPlaceholder topRightImgUrl="/opensea.svg" />
              <ProfileCardPlaceholder topRightImgUrl="/gitcoin.svg" />
              <ProfileCardPlaceholder topRightImgUrl="/sound.svg" />
              <ProfileCardPlaceholder
                topRightImgUrl="/disco.svg"
                invert={true}
              />
            </>
          )}
          {account.isConnected && typeof account.address === "string" && (
            <>
              <ProfileCardEns address={account.address} />
              <ProfileCardLens address={account.address} />
              <ProfileCardEtherscan address={account.address} />
              <ProfileCardPlaceholder topRightImgUrl="/opensea.svg" />
              <ProfileCardPlaceholder topRightImgUrl="/gitcoin.svg" />
              <ProfileCardPlaceholder topRightImgUrl="/sound.svg" />
              <ProfileCardPlaceholder
                topRightImgUrl="/disco.svg"
                invert={true}
              />
            </>
          )}
        </ul>
      </div>
    </main>
  );
};

export default Home;
