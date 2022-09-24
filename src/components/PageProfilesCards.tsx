import { Page, ProfileCardBasic } from "components";
import {
  useEnsName,
  useLensProfiles,
  isEthAddress,
  isEnsName,
  getDefaultProfile,
  getMostFollowedProfile,
  getFirstProfile,
  isLensName,
  useLaunch,
  getLensterUrl,
  useEnsAddress,
  useLensAddress,
} from "@relaycc/receiver";
import { ProfileCardLogo } from "components/ProfileCardLogo";
import { ProfileCardToggle } from "components/ProfileCardToggle";

export const PageProfilesCards = ({ handle }: { handle?: string | null }) => {
  const launch = useLaunch();
  const ensAddress = useEnsAddress({
    handle: isEnsName(handle) ? handle : null,
  });
  const lensAddress = useLensAddress({
    handle: isLensName(handle) ? handle : null,
  });
  const address = isEthAddress(handle)
    ? handle
    : isEthAddress(ensAddress.address)
    ? ensAddress.address
    : isEthAddress(lensAddress.address)
    ? lensAddress.address
    : undefined;
  const lensProfiles = useLensProfiles({
    address: isEthAddress(address) ? address : null,
  });
  const ensName = useEnsName({
    handle: isEthAddress(address) ? address : null,
  });
  const lensProfile =
    lensProfiles.profiles === undefined
      ? undefined
      : getDefaultProfile(lensProfiles.profiles) ||
        getMostFollowedProfile(lensProfiles.profiles) ||
        getFirstProfile(lensProfiles.profiles);

  const displayAddress = isEthAddress(handle)
    ? handle.slice(0, 6) + "..." + handle.slice(-4)
    : undefined;

  const openInNewTab = (url: string) => {
    return () => {
      window.open(url, "_newtab");
    };
  };

  return (
    <Page>
      <ProfileCardToggle
        fadeOut={
          <ProfileCardLogo
            handle={displayAddress}
            title="Relay"
            logo={"/Relay.png"}
            logoClassName={"scale-150 pt-4"}
          />
        }
        fadeIn={
          <ProfileCardBasic
            title="Relay"
            logo="/Relay.png"
            logoAlt="Relay Logo"
            onClickLinkOut={openInNewTab("https://relay.cc/u/" + handle)}
            onClickSendMessage={() => launch(address)}
            linkOutText={"View on Relay"}
            onClickLogo={openInNewTab("https://try.relay.cc")}
          />
        }
      />
      <ProfileCardToggle
        fadeOut={
          <ProfileCardLogo
            handle={lensProfile?.handle}
            title="Lens"
            logo={"/lens.svg"}
          />
        }
        fadeIn={
          <ProfileCardBasic
            title="Lens"
            logo="/lens.svg"
            logoAlt="Lens Logo"
            onClickLinkOut={
              lensProfile === undefined
                ? undefined
                : openInNewTab(getLensterUrl(lensProfile))
            }
            onClickSendMessage={() => launch(address)}
            onClickLogo={openInNewTab("https://lens.xyz")}
            linkOutText={"View on Lenster"}
          />
        }
      />
      <ProfileCardToggle
        fadeOut={
          <ProfileCardLogo
            handle={displayAddress}
            title="Etherscan"
            logo={"/etherscan.svg"}
          />
        }
        fadeIn={
          <ProfileCardBasic
            title="Etherscan"
            logo="/etherscan.svg"
            logoAlt="Etherscan Logo"
            onClickLinkOut={
              isEthAddress(address)
                ? openInNewTab("https://etherscan.io/" + address)
                : undefined
            }
            onClickLogo={openInNewTab("https://etherscan.io")}
            onClickSendMessage={() => launch(address)}
            linkOutText={"View on Etherscan"}
          />
        }
      />
      <ProfileCardToggle
        fadeOut={
          <ProfileCardLogo
            handle={isEnsName(ensName.name) ? ensName.name : undefined}
            title="ENS"
            logo={"/ENS.svg"}
            logoClassName={"scale-150 pt-4"}
          />
        }
        fadeIn={
          <ProfileCardBasic
            title="ENS"
            logo="/ENS.svg"
            logoAlt="ENS Logo"
            onClickLinkOut={
              isEnsName(ensName.name)
                ? openInNewTab(
                    "https://app.ens.domains/name/" + isEnsName(ensName.name)
                  )
                : undefined
            }
            onClickLogo={openInNewTab("https://ens.domains")}
            onClickSendMessage={() => launch(address)}
            linkOutText={"View on ENS"}
            logoClassName="scale-125"
          />
        }
      />
      <ProfileCardToggle
        fadeOut={
          <ProfileCardLogo
            handle={displayAddress}
            title="OpenSea"
            logo={"/opensea.svg"}
          />
        }
        fadeIn={
          <ProfileCardBasic
            onClickLogo={openInNewTab("https://opensea.io")}
            title="OpenSea"
            logo="/opensea.svg"
            logoAlt="OpenSea Logo"
            onClickLinkOut={
              isEthAddress(address)
                ? openInNewTab("https://opensea.io/" + address)
                : undefined
            }
            onClickSendMessage={() => launch(address)}
            linkOutText={"View on OpenSea"}
          />
        }
      />
      <ProfileCardToggle
        fadeOut={
          <ProfileCardLogo
            handle={displayAddress}
            title="disco"
            logo={"/disco.svg"}
            logoClassName={"scale-110 invert"}
          />
        }
        fadeIn={
          <ProfileCardBasic
            onClickLogo={openInNewTab("https://disco.xyz")}
            title="Disco"
            logo="/disco.svg"
            logoAlt="Disco Logo"
            onClickLinkOut={openInNewTab("https://disco.xyz/")}
            onClickSendMessage={() => launch(address)}
            linkOutText={"View on Disco"}
            logoClassName="invert"
          />
        }
      />
    </Page>
  );
};
