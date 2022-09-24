import { useState, useEffect } from "react";
import {
  useLaunch,
  useEthBalance,
  useTransactionCount,
  useEnsAddress,
  useEnsName,
  useLensAddress,
  isEnsName,
  isLensName,
  isEthAddress,
} from "@relaycc/receiver";
import { ProfileCard } from "../ProfileCard";
import { ProfileCardHeader } from "../ProfileCardHeader";
import Blockies from "react-blockies";
import { ProfileCardLoading } from "../ProfileCardLoading";
import { ProfileCardDataRow } from "../ProfileCardDataRow";
import { IconCopy } from "../icons/IconCopy";
import { IconLinkOut } from "../icons/IconLinkOut";
import { motion } from "framer-motion";

export const ProfileCardEtherscan = ({
  handle,
}: {
  handle?: string | null;
}) => {
  const [showProfilePicture, setShowProfilePicture] = useState(true);
  const launch = useLaunch();
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
  const ethBalance = useEthBalance({ handle: address });
  const transCount = useTransactionCount({ handle: address });

  useEffect(() => {
    setShowProfilePicture(isEthAddress(address));
  }, [address]);

  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1500);
  }, []);

  if (!isEthAddress(address)) {
    return (
      <ProfileCardLoading
        shouldPulse={false}
        topRightImgUrl="/etherscan-logo-circle.svg"
      />
    );
  } else {
    if (
      isFetching ||
      ethBalance.status === "fetching" ||
      transCount.status === "fetching"
    ) {
      return (
        <ProfileCardLoading
          shouldPulse={true}
          topRightImgUrl="/etherscan-logo-circle.svg"
        />
      );
    } else {
      return (
        <ProfileCard>
          <ProfileCardHeader text={"etherscan"}>
            <button className="relative group flex justify-center items-center p-0 bg-white w-[5rem] h-[5rem] rounded-md">
              {/* eslint-disable-next-line */}
              <motion.img
                // variants={showProfilePicture ? MOTION_VARIANTS.fadeOut : {}}
                src="/etherscan-logo-circle.svg"
                alt="Etherscan Logo"
                className="absolute h-[5rem] w-[5rem] rounded-md p-2"
              />
              {/* eslint-disable-next-line */}
              {showProfilePicture && (
                <motion.div
                  // variants={MOTION_VARIANTS.fadeIn}
                  className="absolute h-[5rem] w-[5rem] rounded-md"
                >
                  <Blockies
                    seed={address.toLocaleLowerCase()}
                    size={14}
                    scale={5}
                    className="rounded-md"
                  />
                </motion.div>
              )}
            </button>
          </ProfileCardHeader>
          <ProfileCardDataRow
            onClick={() => navigator.clipboard.writeText(address)}
          >
            {address.slice(0, 8) + "..." + address.slice(-4)}
            <IconCopy />
          </ProfileCardDataRow>
          <ProfileCardDataRow>
            {String(transCount.count) + " Transactions"}
          </ProfileCardDataRow>
          <ProfileCardDataRow>
            {String(Number(ethBalance.balance) * 10e-19).slice(0, 7) + " ETH"}
          </ProfileCardDataRow>
          <ProfileCardDataRow className="mt-auto bg-secondary">
            View on Etherscan
            <IconLinkOut />
          </ProfileCardDataRow>
        </ProfileCard>
      );
    }
  }
};
