import type { NextPage } from "next";
import {
  ProfileCardLens,
  ProfileCardEns,
  ProfileCardEtherscan,
  ProfileCardPlaceholder,
  ProfileCardRelay,
  Page,
  ProfileCardSound,
  ProfileCardPoap,
} from "components";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ProfileCardOpenSea } from "components/ProfileCardOpenSea";
import { ProfileCardPoH } from "components/ProfileCardPoH";
import { ProfileCardGitPoap } from "components/ProfileCardGitPoap";
import { ProfileCardSnapshot } from "components/ProfileCardSnapshot";
import { ProfileCardLooksRare } from "components/ProfileCardLooksRare";
import { ProfileCard101 } from "components/ProfileCard101";
import { ProfileCardMazury } from "components/ProfileCardMazury";
import { ProfileCardMintKudos } from "components/ProfileCardMintKudos";

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
    <Page>
      {account.isConnected || (
        <>
          <ProfileCardPlaceholder topRightImgUrl="/Relay.png" />
          <ProfileCardPlaceholder topRightImgUrl="/LENS LOGO_ copy_Minimal.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/ENS.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/etherscan-logo-circle.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/opensea.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/gitcoin.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/sound.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/disco.svg" invert={true} />
          <ProfileCardPlaceholder
            topRightImgUrl="https://www.showkarma.xyz/_next/image?url=%2Fimages%2Fkarma-letter-space.png&w=64&q=75"
            invert={true}
          />
          <ProfileCardPlaceholder topRightImgUrl="https://cyberconnect.me/_next/image?url=%2Fassets%2Fgrains.svg&w=32&q=75" />
          <ProfileCardPlaceholder topRightImgUrl="https://www.farcaster.xyz/img/logo_48.png" />
          <ProfileCardPlaceholder
            topRightImgUrl="https://101.xyz/images/101.svg"
            invert={true}
          />
          <ProfileCardPlaceholder topRightImgUrl="https://mirror-media.imgix.net/publication-images/d3Cl6F0DzzwYWTDxFMLal.png?h=75&w=75" />
          <ProfileCardPlaceholder topRightImgUrl="/dotbit.svg" />
        </>
      )}
      {account.isConnected && typeof account.address === "string" && (
        <>
          <ProfileCardRelay handle={account.address} />
          <ProfileCardLens handle={account.address} />
          <ProfileCardEns handle={account.address} />
          <ProfileCardEtherscan handle={account.address} />
          <ProfileCardSound handle={account.address} />
          <ProfileCardPoap handle={account.address} />
          <ProfileCardOpenSea handle={account.address} />
          <ProfileCardPoH handle={account.address} />
          <ProfileCardGitPoap handle={account.address} />
          <ProfileCardSnapshot handle={account.address} />
          <ProfileCardLooksRare handle={account.address} />
          <ProfileCard101 handle={account.address} />
          <ProfileCardMazury handle={account.address} />
          <ProfileCardMintKudos handle={account.address} />
          <ProfileCardPlaceholder topRightImgUrl="/philand.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/gitcoin.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/disco.svg" invert={true} />
          <ProfileCardPlaceholder
            topRightImgUrl="https://www.showkarma.xyz/_next/image?url=%2Fimages%2Fkarma-letter-space.png&w=64&q=75"
            invert={true}
          />
          <ProfileCardPlaceholder topRightImgUrl="https://cyberconnect.me/_next/image?url=%2Fassets%2Fgrains.svg&w=32&q=75" />
          <ProfileCardPlaceholder topRightImgUrl="https://www.farcaster.xyz/img/logo_48.png" />
          <ProfileCardPlaceholder topRightImgUrl="https://mirror-media.imgix.net/publication-images/d3Cl6F0DzzwYWTDxFMLal.png?h=75&w=75" />
          <ProfileCardPlaceholder topRightImgUrl="/dotbit.svg" />
        </>
      )}
    </Page>
  );
};

export default Home;
