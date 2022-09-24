import { useState, useEffect } from "react";
import {
  useLaunch,
  useEnsName,
  useEnsAvatar,
  isEthAddress,
  useOwnedNfts,
  OwnedNFTsResponse,
  useEnsAddress,
  isEnsName,
} from "@relaycc/receiver";
import { MOTION_VARIANTS } from "../ProfileCard";
import { ProfileCard } from "../ProfileCard";
import { ProfileCardLoading } from "../ProfileCardLoading";
import { ProfileCardHeader } from "../ProfileCardHeader";
import { ProfileCardDataRow } from "../ProfileCardDataRow";
import { IconLinkOut } from "../icons/IconLinkOut";
import { motion } from "framer-motion";

export const ProfileCardEns = ({ handle }: { handle?: string | null }) => {
  const [showProfilePicture, setShowProfilePicture] = useState(true);
  const ensAddress = useEnsAddress({
    handle: isEnsName(handle) ? handle : undefined,
  });
  const address = isEthAddress(handle)
    ? handle
    : isEthAddress(ensAddress.address)
    ? ensAddress.address
    : undefined;
  const ensName = useEnsName({
    handle: address,
  });
  const ensAvatar = useEnsAvatar({ handle: address });
  const ownedNfts = useOwnedNfts({
    handle,
    // ENS Contract Address
    contractAddress: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
  });
  const [isFetching, setIsFetching] = useState(true);
  // All this does is make the component show as loading for 1.5 seconds, even
  // if it's not. Sometimes this makes for a better UX.
  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1500);
  }, []);

  useEffect(() => {
    setShowProfilePicture(ensAvatar.avatar !== undefined);
  }, [ensAvatar.avatar]);

  if (!isEthAddress(address)) {
    return (
      <ProfileCardLoading
        key="not an address"
        shouldPulse={false}
        topRightImgUrl={"/ENS.svg"}
      />
    );
  } else {
    if (
      isFetching ||
      ensAvatar.status === "fetching" ||
      ensName.status === "fetching"
    ) {
      return (
        <ProfileCardLoading
          key="isFetching"
          shouldPulse={true}
          topRightImgUrl={"/ENS.svg"}
        />
      );
    } else {
      if (ensName.name === undefined || ownedNfts.ownedNfts === undefined) {
        return (
          <ProfileCardLoading
            key="no ens name"
            shouldPulse={false}
            topRightImgUrl={"/ENS.svg"}
          />
        );
      } else {
        return (
          <ProfileCard>
            <ProfileCardHeader text="ens">
              <button className="relative group flex justify-center items-center p-0 bg-white w-[5rem] h-[5rem] rounded-md">
                {/* eslint-disable-next-line */}
                <motion.img
                  variants={showProfilePicture ? MOTION_VARIANTS.fadeOut : {}}
                  src={"/ENS.svg"}
                  alt="ENS Logo"
                  className="absolute h-[5rem] w-[5rem] rounded-md"
                />
                {/* eslint-disable-next-line */}
                {showProfilePicture && (
                  <motion.img
                    onError={() => {
                      setShowProfilePicture(false);
                    }}
                    variants={MOTION_VARIANTS.fadeIn}
                    src={ensAvatar.avatar}
                    alt="ENS Avatar"
                    className="absolute h-[5rem] w-[5rem] rounded-md"
                  />
                )}
              </button>
            </ProfileCardHeader>
            <ProfileCardDataRow>{ensName.name}</ProfileCardDataRow>
            <ProfileCardDataRow>
              {getNumEnsNames(ownedNfts.ownedNfts)} Aliases
            </ProfileCardDataRow>
            <ProfileCardDataRow>
              {`Last updated ${getLastUpdated(
                ensName.name,
                ownedNfts.ownedNfts
              )?.toLocaleDateString()}`}
            </ProfileCardDataRow>
            <ProfileCardDataRow className="mt-auto bg-secondary">
              View on ENS
              <IconLinkOut />
            </ProfileCardDataRow>
          </ProfileCard>
        );
      }
    }
  }
};

const getNumEnsNames = (ownedNfts: OwnedNFTsResponse): number => {
  return ownedNfts.ownedNfts.filter((data) => {
    return (
      data.contract.address.toLowerCase() ===
      "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85".toLowerCase()
    );
  }).length;
};

const getLastUpdated = (
  ensName: string,
  ownedNfts: OwnedNFTsResponse
): Date | null => {
  const nft = ownedNfts.ownedNfts.find((nft) => nft.title === ensName);
  if (nft === undefined) {
    return null;
  } else {
    try {
      return new Date(nft.timeLastUpdated);
    } catch {
      return null;
    }
  }
};
