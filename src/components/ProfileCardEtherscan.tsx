import { useState, useEffect } from "react";
import {
  useLaunch,
  useEthBalance,
  useTransactionCount,
} from "@relaycc/receiver";
import { ProfileCard } from "./ProfileCard";
import Blockies from "react-blockies";
import { ProfileCardPlaceholder } from "./ProfileCardPlaceholder";

export const ProfileCardEtherscan = ({ address }: { address: string }) => {
  const launch = useLaunch();
  const [isFetching, setIsFetching] = useState(true);
  const ethBalance = useEthBalance({ handle: address });
  const transCount = useTransactionCount({ handle: address });

  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1500);
  }, []);

  if (isFetching) {
    return (
      <ProfileCardPlaceholder
        shouldPulse={true}
        topRightImgUrl="/etherscan-logo-circle.svg"
      />
    );
  } else {
    if (ethBalance.status === "fetching" || transCount.status === "fetching") {
      return (
        <ProfileCardPlaceholder
          shouldPulse={true}
          topRightImgUrl="/etherscan-logo-circle.svg"
        />
      );
    } else {
      return (
        <ProfileCard
          topLeftImgUrl={
            <Blockies
              seed={address.toLocaleLowerCase()}
              size={22}
              scale={5}
              className="rounded-md"
            />
          }
          onClickLinkOut={() => {
            window.open("https://etherscan.io/address/" + address, "_newtab");
          }}
          topRightImgUrl={"/etherscan-logo-circle.svg"}
          topRightImgOnClick={() => {
            window.open("https://etherscan.io", "_newtab");
          }}
          primaryButtonText={address.slice(0, 8) + "..." + address.slice(-4)}
          primaryButtonOnClick={() => {
            launch(address);
          }}
          dataCard={(() => {
            return (
              <div className="h-40 w-full flex flex-col gap-1 bg-none rounded-md bg-white p-3">
                <h6 className="text-xl font-bold">ETH Balance</h6>
                {ethBalance.balance}
                <h6 className="text-xl font-bold">Total Transactions</h6>
                {transCount.count}
              </div>
            );
          })()}
        />
      );
    }
  }
};
