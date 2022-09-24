import {
  getDefaultProfile,
  getFirstProfile,
  getMostFollowedProfile,
  useLensProfiles,
  isIpfsUrl,
  gatewayFromIpfs,
  isEthAddress,
  useLensAddress,
  getLensterUrl,
} from "@relaycc/receiver";
import { useEffect, useState } from "react";
import { ProfileCard } from "../ProfileCard";
import { ProfileCardLoading } from "../ProfileCardLoading";
import { ProfileCardDataRow } from "../ProfileCardDataRow";
import { ProfileCardHeader } from "../ProfileCardHeader";
import { motion } from "framer-motion";
import { MOTION_VARIANTS } from "../ProfileCard";
import { IconLinkOut } from "../icons/IconLinkOut";

export const ProfileCardLens = ({ handle }: { handle?: string | null }) => {
  const [showProfilePicture, setShowProfilePicture] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const lensAddress = useLensAddress({ handle });
  const address = isEthAddress(handle)
    ? handle
    : isEthAddress(lensAddress.address)
    ? lensAddress.address
    : undefined;
  const lensProfiles = useLensProfiles({ address });

  // All this does is make the component show as loading for 1.5 seconds, even
  // if it's not. Sometimes this makes for a better UX.
  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1500);
  }, []);

  const displayProfile =
    lensProfiles.profiles === undefined
      ? undefined
      : getDefaultProfile(lensProfiles.profiles) ||
        getMostFollowedProfile(lensProfiles.profiles) ||
        getFirstProfile(lensProfiles.profiles);

  const lensProfilePicture =
    displayProfile === undefined
      ? undefined
      : isIpfsUrl(displayProfile.picture.original.url)
      ? gatewayFromIpfs(displayProfile.picture.original.url)
      : displayProfile.picture.original.url;

  useEffect(() => {
    setShowProfilePicture(lensProfilePicture !== undefined);
  }, [lensProfilePicture]);

  if (!isEthAddress(address)) {
    return (
      <ProfileCardLoading
        // TODO(achilles@relay.cc) Without this key then both this branch of the
        // conditional and the next branch of the conditional render the same
        // component and the "shouldPulse" behavior doesn't change. I.e. the
        // component never stops pulsing.
        key={"1"}
        shouldPulse={false}
        topRightImgUrl={"/LENS LOGO_ copy_Minimal.svg"}
      />
    );
  } else {
    if (isFetching || lensProfiles.status === "fetching") {
      return (
        <ProfileCardLoading
          key={"2"}
          shouldPulse={true}
          topRightImgUrl={"/LENS LOGO_ copy_Minimal.svg"}
        />
      );
    } else {
      if (displayProfile === undefined) {
        return (
          <ProfileCardLoading
            key={"2"}
            shouldPulse={false}
            topRightImgUrl={"/LENS LOGO_ copy_Minimal.svg"}
          />
        );
      } else {
        return (
          <ProfileCard>
            <ProfileCardHeader text="lens.xyz">
              <button className="relative group flex justify-center items-center p-0 bg-white w-[5rem] h-[5rem] rounded-md">
                {/* eslint-disable-next-line */}
                <motion.img
                  variants={showProfilePicture ? MOTION_VARIANTS.fadeOut : {}}
                  src={"/LENS LOGO_ copy_Minimal.svg"}
                  alt="Lens Logo"
                  className="absolute h-[5rem] w-[5rem] rounded-md"
                />
                {/* eslint-disable-next-line */}
                {showProfilePicture && (
                  <motion.img
                    onError={() => {
                      setShowProfilePicture(false);
                    }}
                    variants={showProfilePicture ? MOTION_VARIANTS.fadeIn : {}}
                    src={lensProfilePicture}
                    alt="Lens Logo"
                    className="absolute h-[5rem] w-[5rem] rounded-md"
                  />
                )}
              </button>
            </ProfileCardHeader>
            <ProfileCardDataRow className="mt-auto">
              Send a Message
            </ProfileCardDataRow>
            <ProfileCardDataRow className="bg-secondary">
              View on Lens
              <IconLinkOut />
            </ProfileCardDataRow>
          </ProfileCard>
        );
      }
    }
  }
};
