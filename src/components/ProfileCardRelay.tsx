import {
  isEnsName,
  isEthAddress,
  isLensName,
  useEnsAddress,
  useEnsAvatar,
  useEnsName,
  useLaunch,
  useLensAddress,
  useLensProfiles,
  getDefaultProfile,
  getFirstProfile,
  getMostFollowedProfile,
} from "@relaycc/receiver";
import Blockies from "react-blockies";
import { IconChat } from "./IconChat";
import { ProfileCard } from "./ProfileCard";
import { ProfileCardHeader } from "./ProfileCardHeader";
import { FunctionComponent } from "react";
import { ProfileCardDataRow } from "./ProfileCardDataRow";

export const ProfileCardRelay: FunctionComponent<{
  handle?: string | null;
}> = ({ handle }) => {
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
  const ensAvatar = useEnsAvatar({
    handle: isEthAddress(address) ? address : null,
  });
  const lensProfile =
    lensProfiles.profiles === undefined
      ? undefined
      : getDefaultProfile(lensProfiles.profiles) ||
        getMostFollowedProfile(lensProfiles.profiles) ||
        getFirstProfile(lensProfiles.profiles);

  // const topLeftImage = (() => {
  //   if (typeof router.query.handle === "string") {
  //     if (typeof ensAvatar.avatar === "string") {
  //       return (
  //         /* eslint-disable-next-line */
  //         <img
  //           className="rounded-md h-28 w-28"
  //           src={ensAvatar.avatar}
  //           alt="pfp"
  //         />
  //       );
  //     } else {
  //       return (
  //         <Blockies
  //           seed={router.query.handle.toLocaleLowerCase()}
  //           size={22}
  //           scale={5}
  //           className="rounded-md"
  //         />
  //       );
  //     }
  //   }
  // })();

  return (
    <ProfileCard>
      <ProfileCardHeader text="Relay">
        <button className="flex justify-center items-center p-0 bg-white w-[5rem] h-[5rem] rounded-md">
          {/* eslint-disable-next-line */}
          <img
            src={"/Relay.png"}
            alt="Relay Logo"
            className="h-[4rem] w-[4rem]"
          />
        </button>
      </ProfileCardHeader>
      <ProfileCardDataRow>
        {ensName.name === undefined ? "No ENS Name" : ensName.name}
      </ProfileCardDataRow>
      <ProfileCardDataRow>
        {lensProfile === undefined ? "No Lens Profile" : lensProfile.handle}
      </ProfileCardDataRow>
      <ProfileCardDataRow>
        {isEthAddress(address)
          ? address.slice(0, 8) + "..." + address.slice(-4)
          : "..."}
      </ProfileCardDataRow>
      <ProfileCardDataRow onClick={launch}>
        Send A Message <IconChat />
      </ProfileCardDataRow>
    </ProfileCard>
  );
};
