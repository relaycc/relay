import {
  isEthAddress,
  useLensAddress,
  useEnsAddress,
  isLensName,
  isEnsName,
} from "@relaycc/receiver";
import { useEffect, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { ProfileCardPlaceholder } from "./ProfileCardPlaceholder";
import { ProfileCardDataRow } from "./ProfileCardDataRow";
import { ProfileCardHeader } from "./ProfileCardHeader";

export const ProfileCardPoH = ({ handle }: { handle?: string | null }) => {
  const [isFetching, setIsFetching] = useState(true);
  const ensAddress = useEnsAddress({
    handle: isEnsName(handle) ? handle : undefined,
  });
  const lensAddress = useLensAddress({
    handle: isLensName(handle) ? handle : undefined,
  });
  const address = isEthAddress(handle)
    ? handle
    : isEthAddress(ensAddress.address)
    ? ensAddress.address
    : isEthAddress(lensAddress.address)
    ? lensAddress.address
    : undefined;

  const title = "Proof Of Humanity";
  const logo = "/PoH.svg";
  const onClickLink = () =>
    window.open("https://app.proofofhumanity.id", "_newtab");
  const onClickLinkOut = () => {
    if (isEthAddress(address)) {
      window.open(
        "https://app.proofofhumanity.id/profile/" + address,
        "_newtab"
      );
    }
  };
  const display = "View on Proof of Humanity";

  // All this does is make the component show as loading for 1.5 seconds, even
  // if it's not. Sometimes this makes for a better UX.
  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1500);
  }, []);

  if (!isEthAddress(address)) {
    return (
      <ProfileCardPlaceholder
        // TODO(achilles@relay.cc) Without this key then both this branch of the
        // conditional and the next branch of the conditional render the same
        // component and the "shouldPulse" behavior doesn't change. I.e. the
        // component never stops pulsing.
        key={"1"}
        shouldPulse={false}
        topRightImgUrl={logo}
      />
    );
  } else {
    if (isFetching) {
      return (
        <ProfileCardPlaceholder
          key={"2"}
          shouldPulse={true}
          topRightImgUrl={logo}
        />
      );
    } else {
      if (address === undefined) {
        return (
          <ProfileCardPlaceholder
            key={"3"}
            shouldPulse={false}
            topRightImgUrl={logo}
          />
        );
      } else {
        return (
          <ProfileCard>
            <ProfileCardHeader text={title}>
              <button
                onClick={onClickLink}
                className="relative group flex justify-center items-center p-0 bg-white w-[5rem] h-[5rem] min-w-[5rem] rounded-md"
              >
                {/* eslint-disable-next-line */}
                <img
                  src={logo}
                  alt={title + " Logo"}
                  className="absolute h-[5rem] w-[5rem] min-w-[5rem] rounded-md p-2"
                />
              </button>
            </ProfileCardHeader>
            <ProfileCardDataRow onClick={onClickLinkOut} className="mt-auto">
              {display}
            </ProfileCardDataRow>
          </ProfileCard>
        );
      }
    }
  }
};
