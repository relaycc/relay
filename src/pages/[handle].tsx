import type { NextPage } from "next";
import {
  ProfileCardEns,
  ProfileCardPlaceholder,
  ProfileCardConnect,
  ProfileCardLens,
  ProfileCardEtherscan,
} from "components";
import {
  Window,
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
        <main
          data-theme="retro"
          className="w-screen h-screen flex flex-row justify-center overflow-scroll bg-blue-200"
        >
          <div className="container mx-auto flex flex-col align-center flex-grow">
            <ul className="flex flex-row basis-1/4 flex-wrap gap-8 p-8">
              <ProfileCardConnect />
              <>
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
              </>
            </ul>
          </div>
        </main>
      );
    } else {
      return (
        <main
          data-theme="retro"
          className="w-screen h-screen flex flex-row justify-center overflow-scroll bg-blue-200"
        >
          <div className="container mx-auto flex flex-col align-center flex-grow">
            <ul className="flex flex-row basis-1/4 flex-wrap gap-8 p-8">
              <ProfileCardConnect />
              <>
                <ProfileCardPlaceholder topRightImgUrl="/ENS.svg" />
                <ProfileCardPlaceholder topRightImgUrl="/LENS LOGO_ copy_Minimal.svg" />
                <ProfileCardPlaceholder topRightImgUrl="/etherscan-logo-circle.svg" />
                <ProfileCardPlaceholder topRightImgUrl="/sound.svg" />
                <ProfileCardPlaceholder topRightImgUrl="/opensea.svg" />
                <ProfileCardPlaceholder topRightImgUrl="/gitcoin.svg" />
                <ProfileCardPlaceholder topRightImgUrl="/sound.svg" />
                <ProfileCardPlaceholder
                  topRightImgUrl="/disco.svg"
                  invert={true}
                />
              </>
            </ul>
          </div>
        </main>
      );
    }
  } else {
    return (
      <main
        data-theme="retro"
        className="w-screen h-screen flex flex-row justify-center overflow-scroll bg-blue-200"
      >
        <Window />
        <div className="container mx-auto flex flex-col align-center flex-grow">
          <ul className="flex flex-row basis-1/4 flex-wrap gap-8 p-8">
            <ProfileCardConnect />
            <ProfileCardEns address={address} />
            <ProfileCardLens address={address} />
            <ProfileCardEtherscan address={address} />
            <ProfileCardPlaceholder topRightImgUrl="/opensea.svg" />
            <ProfileCardPlaceholder topRightImgUrl="/gitcoin.svg" />
            <ProfileCardPlaceholder topRightImgUrl="/sound.svg" />
            <ProfileCardPlaceholder topRightImgUrl="/disco.svg" invert={true} />
          </ul>
        </div>
      </main>
    );
  }
};

export default Home;
