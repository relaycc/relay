import { useCallback } from "react";
import { Page, AppCard, LogoCard, HoverToggle } from "components";
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

export const Profile = ({ handle }: { handle?: string | null }) => {
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

  const openInNewTab = (url: string) => {
    return () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };
  };
  const onClickSendMessage = () => {
    if (isEthAddress(address)) {
      return () => launch(address);
    } else {
      undefined;
    }
  };
  const linkOutIfEthAddress = useCallback(
    (url: string) => {
      if (isEthAddress(address)) {
        return openInNewTab(url);
      } else {
        return undefined;
      }
    },
    [address]
  );

  return (
    <Page>
      <HoverToggle
        fadeOut={
          <LogoCard
            title="Relay"
            logo={"/Relay.png"}
            logoClassName={"scale-150 pt-4"}
          />
        }
        fadeIn={
          <AppCard
            title="Relay"
            logo="/Relay.png"
            logoAlt="Relay Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://relay.cc/u/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            onClickLogo={openInNewTab("https://relay.cc")}
            linkOutText={"View on Relay"}
          />
        }
      />
      <HoverToggle
        fadeOut={
          <LogoCard
            title={isEnsName(ensName.name) ? ensName.name : "ENS"}
            logo={"/ENS.svg"}
            logoClassName={"scale-150 pt-4"}
          />
        }
        fadeIn={
          <AppCard
            title="ENS"
            logo="/ENS.svg"
            logoAlt="ENS Logo"
            onClickLinkOut={
              isEnsName(ensName.name)
                ? openInNewTab("https://app.ens.domains/name/" + ensName.name)
                : undefined
            }
            onClickLogo={openInNewTab("https://ens.domains")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on ENS"}
            logoClassName="scale-125"
          />
        }
      />
      <HoverToggle
        fadeOut={
          <LogoCard
            title={lensProfile === undefined ? "Lens" : lensProfile.handle}
            logo={"/lens.svg"}
          />
        }
        fadeIn={
          <AppCard
            title="Lens"
            logo="/lens.svg"
            logoAlt="Lens Logo"
            onClickLinkOut={
              lensProfile === undefined
                ? undefined
                : openInNewTab(getLensterUrl(lensProfile))
            }
            onClickSendMessage={onClickSendMessage()}
            onClickLogo={openInNewTab("https://lens.xyz")}
            linkOutText={"View on Lenster"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="poap" logo={"/poap.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://poap.gallery")}
            title="POAP"
            logo="/poap.svg"
            logoAlt="POAP Logo"
            onClickLinkOut={openInNewTab(
              "https://app.poap.xyz/scan/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on POAP"}
          />
        }
      />
      <HoverToggle
        fadeOut={
          <LogoCard
            title={
              isEthAddress(address)
                ? address.slice(0, 6) + "..." + address.slice(-4)
                : "Etherscan"
            }
            logo={"/etherscan.svg"}
          />
        }
        fadeIn={
          <AppCard
            title="Etherscan"
            logo="/etherscan.svg"
            logoAlt="Etherscan Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://etherscan.io/" + address
            )}
            onClickLogo={openInNewTab("https://etherscan.io")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Etherscan"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="OpenSea" logo={"/opensea.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://opensea.io")}
            title="OpenSea"
            logo="/opensea.svg"
            logoAlt="OpenSea Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://opensea.io/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on OpenSea"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="lenster" logo={"/lenster.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://lenster.xyz")}
            title="Lenster"
            logo="/lenster.svg"
            logoAlt="Lenster Logo"
            onClickLinkOut={
              isEthAddress(lensAddress.address)
                ? openInNewTab("https://lenster.xyz/u/" + handle)
                : undefined
            }
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Lenster"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="lenstube" logo={"/lenstube.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://lenstube.xyz")}
            title="Lenstube"
            logo="/lenstube.svg"
            logoAlt="Lenstube Logo"
            onClickLinkOut={
              isEthAddress(lensAddress.address)
                ? openInNewTab("https://lenstube.xyz/" + handle)
                : undefined
            }
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Lenstube"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="gitpoap" logo={"/gitpoap.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://gitpoap.io")}
            title="GitPOAP"
            logo="/gitpoap.svg"
            logoAlt="GitPOAP Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://gitpoap.io/p/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on GitPOAP"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="snapshot" logo={"/snapshot.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://snapshot.org")}
            title="Snapshot"
            logo="/snapshot.svg"
            logoAlt="Snapshot Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://snapshot.org/#/profile/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Snapshot"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="proof of humanity" logo={"/poh.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://app.proofofhumanity.id")}
            title="Proof of Humanity"
            logo="/poh.svg"
            logoAlt="Proof Of Humanity Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://app.proofofhumanity.id/profile/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on PoH"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="sound" logo={"/sound.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://www.sound.xyz")}
            title="Sound"
            logo="/sound.svg"
            logoAlt="Sound Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://www.sound.xyz/user/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Sound"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="Showtime" logo={"/showtime.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://showtime.xyz")}
            title="Showtime"
            logo="/showtime.png"
            logoAlt="Showtime Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://showtime.xyz/@" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Showtime"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="deepdao" logo={"/deepdao.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://deepdao.io")}
            title="deepdao"
            logo="/deepdao.png"
            logoAlt="deepdao logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://deepdao.io/user/" + address + "/verified_dao_experience"
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on DeepDAO"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="looksrare" logo={"/looksrare.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://looksrare.org")}
            title="LooksRare"
            logo="/looksrare.svg"
            logoAlt="LooksRare Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://looksrare.org/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on LooksRare"}
          />
        }
      />
      <HoverToggle
        fadeOut={
          <LogoCard
            title="101"
            logo={"/101.svg"}
            logoClassName="scale-110 invert mt-8"
          />
        }
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://101.xyz")}
            title="101"
            logo="/101.svg"
            logoAlt="101 Logo"
            onClickLinkOut={
              isEnsName(ensName.name)
                ? openInNewTab("https://101.xyz/u/" + ensName.name)
                : undefined
            }
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on 101"}
            logoClassName="invert"
          />
        }
      />
      <HoverToggle
        fadeOut={
          <LogoCard
            title="Disco"
            logo={"/disco.svg"}
            logoClassName={"scale-110 invert"}
          />
        }
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://disco.xyz")}
            title="Disco"
            logo="/disco.svg"
            logoAlt="Disco Logo"
            onClickLinkOut={openInNewTab("https://disco.xyz/")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Disco"}
            logoClassName="invert"
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="boardroom" logo={"/boardroom.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://boardroom.io")}
            title="Boardroom"
            logo="/boardroom.png"
            logoAlt="Boardroom Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://boardroom.io/voter/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Boardroom"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="backdrop" logo={"/backdrop.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://backdrop.so")}
            title="backdrop"
            logo="/backdrop.svg"
            logoAlt="backdrop logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://backdrop.so/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Backdrop"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="farcaster" logo={"/farcaster.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://farcaster.network")}
            title="Farcaster"
            logo="/farcaster.png"
            logoAlt="Farcaster Logo"
            onClickLinkOut={openInNewTab("https://farcaster.network")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Farcaster"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="mazury" logo={"/mazury.jpg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://mazury.xyz")}
            title="Mazury"
            logo="/mazury.jpg"
            logoAlt="Mazury Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://app.mazury.xyz/people/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Mazury"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="karma" logo={"/karma.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://showkarma.xyz")}
            title="Karma"
            logo="/karma.png"
            logoAlt="Karma Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://www.showkarma.xyz/profile/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Karma"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="rarible" logo={"/rarible.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://rarible.com")}
            title="Rarible"
            logo="/rarible.svg"
            logoAlt="Rarible Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://rarible.com/user/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Rarible"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="nimi" logo={"/nimi.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://nimi.eth.limo")}
            title="Nimi"
            logo="/nimi.png"
            logoAlt="Nimi Logo"
            onClickLinkOut={
              isEnsName(ensName.name)
                ? openInNewTab(`https://${ensName.name}.limo`)
                : undefined
            }
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Nimi"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="mintkudos" logo={"/mintkudos.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://mintkudos.xyz")}
            title="Mint Kudos"
            logo="/mintkudos.png"
            logoAlt="Mint Kudos Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://mintkudos.xyz/profile/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Mint Kudos"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="orbis" logo={"/orbis.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://orbis.club")}
            title="Orbis"
            logo="/orbis.png"
            logoAlt="Orbis Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://orbis.club/profile/did:pkh:eip155:1:" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Orbis"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="layer3" logo={"/layer3.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://beta.layer3.xyz")}
            title="Layer3"
            logo="/layer3.png"
            logoAlt="Layer3 logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://beta.layer3.xyz/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Layer3"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="oohlala" logo={"/oohlala.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://www.oohlala.xyz")}
            title="Oohlala"
            logo="/oohlala.png"
            logoAlt="Oohlala Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://www.oohlala.xyz/profile/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Oohlala"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="galxe" logo={"/galxe.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://galxe.com")}
            title="Galxe"
            logo="/galxe.svg"
            logoAlt="Galxe Logo"
            onClickLinkOut={linkOutIfEthAddress(
              "https://galxe.com/galxeid/" + address
            )}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Galxe"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="philand" logo={"/philand.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://philand.xyz")}
            title="Philand"
            logo="/philand.svg"
            logoAlt="Philand Logo"
            onClickLinkOut={openInNewTab("https://philand.xyz")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Philand"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="brightid" logo={"/brightid.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://brightid.org")}
            title="brightid"
            logo="/brightid.svg"
            logoAlt="brightid logo"
            onClickLinkOut={openInNewTab("https://brightid.org")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on brightID"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="gitcoin" logo={"/gitcoin.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://gitcoin.co")}
            title="Gitcoin"
            logo="/gitcoin.svg"
            logoAlt="Gitcoin Logo"
            onClickLinkOut={openInNewTab("https://gitcoin.co")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Gitcoin"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="iden3" logo={"/iden3.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://iden3.io")}
            title="iden3"
            logo="/iden3.svg"
            logoAlt="iden3 logo"
            onClickLinkOut={openInNewTab("https://iden3.io")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Iden3"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="ironfish" logo={"/ironfish.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://ironfish.network")}
            title="Iron Fish"
            logo="/ironfish.png"
            logoAlt="IronFish logo"
            onClickLinkOut={openInNewTab("https://ironfish.network")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Iron Fish"}
          />
        }
      />
      <HoverToggle
        fadeOut={
          <LogoCard title="orangeprotocol" logo={"/orangeprotocol.svg"} />
        }
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://orangeprotocol.io")}
            title="Orange Protocol"
            logo="/orangeprotocol.svg"
            logoAlt="Orange Protocol Logo"
            onClickLinkOut={openInNewTab("https://orangeprotocol.io")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Orange Protocol"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="passport" logo={"/passport.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://passport.gitcoin.co")}
            title="Gitcoin Passport"
            logo="/passport.svg"
            logoAlt="Gitcoin Passport Logo"
            onClickLinkOut={openInNewTab("https://passport.gitcoin.co")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on GTC Passport"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="sealcred" logo={"/sealcred.jpg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://sealcred.xyz")}
            title="SealCred"
            logo="/sealcred.jpg"
            logoAlt="SealCred Logo"
            onClickLinkOut={openInNewTab("https://sealcred.xyz")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on SealCred"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="sismo" logo={"/sismo.svg"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://alpha.sismo.io")}
            title="Sismo"
            logo="/sismo.svg"
            logoAlt="Sismo Logo"
            onClickLinkOut={openInNewTab("https://alpha.sismo.io")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on Sismo"}
          />
        }
      />
      <HoverToggle
        fadeOut={<LogoCard title="spruceid" logo={"/spruceid.png"} />}
        fadeIn={
          <AppCard
            onClickLogo={openInNewTab("https://spruceid.com")}
            title="SpruceID"
            logo="/spruceid.png"
            logoAlt="SpruceID Logo"
            onClickLinkOut={openInNewTab("https://spruceid.com")}
            onClickSendMessage={onClickSendMessage()}
            linkOutText={"View on SpruceID"}
          />
        }
      />
    </Page>
  );
};
