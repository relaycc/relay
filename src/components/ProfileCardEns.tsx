import { useState, useEffect } from "react";
import {
  useLaunch,
  useEnsName,
  useEnsAvatar,
  isEthAddress,
} from "@relaycc/receiver";
import { ProfileCard } from "./ProfileCard";
import { ProfileCardPlaceholder } from "./ProfileCardPlaceholder";
import Blockies from "react-blockies";

export const ProfileCardEns = ({ address }: { address: string | null }) => {
  const launch = useLaunch();
  const ensName = useEnsName({ handle: address });
  const ensAvatar = useEnsAvatar({ handle: address });
  const [isFetching, setIsFetching] = useState(true);
  // All this does is make the component show as loading for 1.5 seconds, even
  // if it's not. Sometimes this makes for a better UX.
  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1500);
  }, []);

  if (!isEthAddress(address)) {
    return (
      <ProfileCardPlaceholder
        key="not an address"
        shouldPulse={true}
        topRightImgUrl={"/ENS.svg"}
      />
    );
  } else {
    if (isFetching) {
      return (
        <ProfileCardPlaceholder
          key="isFetching"
          shouldPulse={true}
          topRightImgUrl={"/ENS.svg"}
        />
      );
    } else {
      if (ensName.status === "fetching" || ensAvatar.status === "fetching") {
        return (
          <ProfileCardPlaceholder
            key="ens hooks fetching"
            shouldPulse={true}
            topRightImgUrl={"/ENS.svg"}
          />
        );
      } else {
        if (ensName.name === undefined) {
          return (
            <ProfileCardPlaceholder
              key="no ens name"
              shouldPulse={false}
              topRightImgUrl={"/ENS.svg"}
            />
          );
        } else {
          return (
            <ProfileCard
              topLeftImgUrl={
                typeof ensAvatar.avatar === "string" ? (
                  ensAvatar.avatar
                ) : (
                  <Blockies
                    seed={address.toLocaleLowerCase()}
                    size={22}
                    scale={5}
                    className="rounded-md"
                  />
                )
              }
              onClickLinkOut={() => {
                window.open(
                  "https://app.ens.domains/name/" + address + "details",
                  "_newtab"
                );
              }}
              topRightImgUrl={"/ENS.svg"}
              topRightImgOnClick={() => {
                window.open("https://ens.domains", "_newtab");
              }}
              primaryButtonText={
                typeof ensName.name === "string"
                  ? ensName.name
                  : "No ENS Name Found"
              }
              primaryButtonOnClick={() => {
                launch(address);
              }}
            />
          );
        }
      }
    }
  }
};
