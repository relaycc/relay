import {
  getDefaultProfile,
  getFirstProfile,
  getMostFollowedProfile,
  useLensProfiles,
  isIpfsUrl,
  gatewayFromIpfs,
  getLensterUrl,
  useLaunch,
} from "@relaycc/receiver";
import { useEffect, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { ProfileCardPlaceholder } from "./ProfileCardPlaceholder";

export const ProfileCardLens = ({ address }: { address: string }) => {
  const launch = useLaunch();
  const [isFetching, setIsFetching] = useState(true);
  const { profiles, status } = useLensProfiles({ address });

  // All this does is make the component show as loading for 1.5 seconds, even
  // if it's not. Sometimes this makes for a better UX.
  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1500);
  }, []);

  const displayProfile =
    profiles === undefined
      ? undefined
      : getDefaultProfile(profiles) ||
        getMostFollowedProfile(profiles) ||
        getFirstProfile(profiles);

  if (isFetching || status === "fetching") {
    return (
      <ProfileCardPlaceholder
        // TODO(achilles@relay.cc) Without this key then both this branch of the
        // conditional and the next branch of the conditional render the same
        // component and the "shouldPulse" behavior doesn't change. I.e. the
        // component never stops pulsing.
        key={"1"}
        shouldPulse={true}
        topRightImgUrl={"/LENS LOGO_ copy_Minimal.svg"}
      />
    );
  } else if (profiles === undefined || displayProfile === undefined) {
    return (
      <ProfileCardPlaceholder
        key={"2"}
        shouldPulse={false}
        topRightImgUrl={"/LENS LOGO_ copy_Minimal.svg"}
      />
    );
  } else {
    return (
      <ProfileCard
        topLeftImgUrl={
          isIpfsUrl(displayProfile.picture.original.url)
            ? gatewayFromIpfs(displayProfile.picture.original.url)
            : displayProfile.picture.original.url
        }
        onClickLinkOut={() => {
          window.open(getLensterUrl(displayProfile), "_newtab");
        }}
        topRightImgUrl={"/LENS LOGO_ copy_Minimal.svg"}
        topRightImgOnClick={() => {
          window.open("https://lens.xyz", "_newtab");
        }}
        primaryButtonText={displayProfile.handle}
        primaryButtonOnClick={() => {
          launch(displayProfile.handle);
        }}
        dataCard={(() => {
          return (
            <div className="h-40 w-full flex flex-col gap-1 bg-none rounded-md bg-white p-3">
              <h6 className="text-2xl">
                <span className="font-bold w-6 inline-block">
                  {displayProfile.stats.totalFollowers}
                </span>{" "}
                Followers
              </h6>
              <h6 className="text-2xl">
                <span className="font-bold w-6 inline-block">
                  {displayProfile.stats.totalFollowing}
                </span>{" "}
                Following
              </h6>
              <h6 className="text-2xl">
                <span className="font-bold w-6 inline-block">
                  {displayProfile.stats.totalPosts}
                </span>{" "}
                Posts
              </h6>
              <h6 className="text-2xl">
                <span className="font-bold w-6 inline-block">
                  {displayProfile.stats.totalComments}
                </span>{" "}
                Comments
              </h6>
            </div>
          );
        })()}
      />
    );
  }
};
