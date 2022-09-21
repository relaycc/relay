import type { NextPage } from "next";
import {
  ProfileCardEns,
  ProfileCardPlaceholder,
  ProfileCardRelay,
  ProfileCardLens,
  ProfileCardEtherscan,
  Page,
} from "components";
import {
  useEnsAddress,
  useLensAddress,
  isLensName,
  isEnsName,
  isEthAddress,
} from "@relaycc/receiver";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const handle = router.query.handle as string;
  const ensAddress = useEnsAddress({
    handle: isEnsName(handle) ? handle : null,
  });
  const lensAddress = useLensAddress({
    handle: isLensName(handle) ? handle : null,
  });

  const address = (() => {
    if (isEthAddress(handle)) {
      return handle;
    } else {
      if (
        typeof ensAddress.address === "string" ||
        typeof lensAddress.address === "string"
      ) {
        return ensAddress.address || lensAddress.address;
      } else {
        return undefined;
      }
    }
  })();

  if (address === undefined) {
    if (ensAddress.status === "fetching" || lensAddress.status === "fetching") {
      return (
        <Page>
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/ENS.svg"
          />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/LENS LOGO_ copy_Minimal.svg"
          />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/etherscan-logo-circle.svg"
          />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/Relay.png"
          />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/sound.svg"
          />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/opensea.svg"
          />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/gitcoin.svg"
          />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/sound.svg"
          />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/disco.svg"
            invert={true}
          />
        </Page>
      );
    } else {
      return (
        <Page>
          <ProfileCardPlaceholder topRightImgUrl="/ENS.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/LENS LOGO_ copy_Minimal.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/etherscan-logo-circle.svg" />
          <ProfileCardPlaceholder
            shouldPulse={true}
            topRightImgUrl="/Relay.png"
          />
          <ProfileCardPlaceholder topRightImgUrl="/sound.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/opensea.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/gitcoin.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/sound.svg" />
          <ProfileCardPlaceholder topRightImgUrl="/disco.svg" invert={true} />
        </Page>
      );
    }
  } else {
    return (
      <Page>
        <ProfileCardEns address={address} />
        <ProfileCardLens address={address} />
        <ProfileCardEtherscan address={address} />
        <ProfileCardPlaceholder topRightImgUrl="/Relay.png" />
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
      </Page>
    );
  }
};

export default Home;
