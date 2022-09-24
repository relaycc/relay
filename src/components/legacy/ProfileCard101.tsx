import { useState, useEffect } from "react";
import {
  useEnsName,
  isEthAddress,
  useEnsAddress,
  isEnsName,
} from "@relaycc/receiver";
import { ProfileCard } from "../ProfileCard";
import { ProfileCardLoading } from "../ProfileCardLoading";
import { ProfileCardHeader } from "../ProfileCardHeader";
import { ProfileCardDataRow } from "../ProfileCardDataRow";

export const ProfileCard101 = ({ handle }: { handle?: string | null }) => {
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
  const [isFetching, setIsFetching] = useState(true);
  // All this does is make the component show as loading for 1.5 seconds, even
  // if it's not. Sometimes this makes for a better UX.
  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1500);
  }, []);

  if (!isEthAddress(address)) {
    return (
      <ProfileCardLoading
        key="not an address"
        shouldPulse={false}
        topRightImgUrl={"/101.svg"}
      />
    );
  } else {
    if (isFetching || ensName.status === "fetching") {
      return (
        <ProfileCardLoading
          key="isFetching"
          shouldPulse={true}
          topRightImgUrl={"/101.svg"}
        />
      );
    } else {
      if (ensName.name === undefined) {
        return (
          <ProfileCardLoading
            key="no ens name"
            shouldPulse={false}
            topRightImgUrl={"/101.svg"}
          />
        );
      } else {
        return (
          <ProfileCard>
            <ProfileCardHeader text={"101.xyz"}>
              <button
                onClick={() => window.open("https://101.xyz", "_newtab")}
                className="relative group flex justify-center items-center p-0 bg-black w-[5rem] h-[5rem] min-w-[5rem] rounded-md"
              >
                {/* eslint-disable-next-line */}
                <img
                  src={"/101.svg"}
                  alt={"101.xyz Logo"}
                  className="absolute h-[5rem] w-[5rem] min-w-[5rem] rounded-md p-2"
                />
              </button>
            </ProfileCardHeader>
            <ProfileCardDataRow
              onClick={() => {
                if (isEnsName(ensName.name)) {
                  window.open("https://101.xyz/u/" + ensName.name, "_newtab");
                }
              }}
              className="mt-auto"
            >
              View on 101.xyz
            </ProfileCardDataRow>
          </ProfileCard>
        );
      }
    }
  }
};
