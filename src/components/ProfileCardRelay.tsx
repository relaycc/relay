import {
  isEthAddress,
  useEnsAvatar,
  useLaunch,
  useEnsName,
  isEnsName,
} from "@relaycc/receiver";
import Blockies from "react-blockies";
import { IconChat } from "./icons/IconChat";
import { IconLinkOut } from "./icons/IconLinkOut";
import { ProfileCard } from "./ProfileCard";
import { FunctionComponent } from "react";
import { ProfileCardDataRow } from "./ProfileCardDataRow";
import { motion } from "framer-motion";

export const ProfileCardRelay: FunctionComponent<{
  address: string;
}> = ({ address }) => {
  const launch = useLaunch();
  const ensAvatar = useEnsAvatar({
    handle: isEthAddress(address) ? address : null,
  });
  const ensName = useEnsName({
    handle: isEthAddress(address) ? address : null,
  });

  const pfp = (() => {
    if (ensAvatar.avatar === undefined) {
      return (
        <Blockies seed={address.toLocaleLowerCase()} size={14} scale={18} />
      );
    } else {
      return (
        /* eslint-disable-next-line */
        <img className="h-full w-full" alt="PFP" src={ensAvatar.avatar} />
      );
    }
  })();

  return (
    <ProfileCard className="overflow-hidden">
      <div className="flex flex-grow justify-center overflow-hidden ml-[-1.5rem] mr-[-1.5rem] mt-[-1.5rem]">
        <motion.button
          whileHover={{ scale: 1.2 }}
          className="relative p-0 mb-0 w-[full] overflow-hidden"
          onClick={() =>
            window.open("https://relay.cc/u/" + address, "_newtab")
          }
        >
          {pfp}
        </motion.button>
      </div>
      <button
        className="border-none bg-none mt-auto text-2xl font-bold flex flex-grow justify-center items-center"
        onClick={() => launch(address)}
      >
        {isEnsName(ensName.name)
          ? ensName.name
          : address.slice(0, 6) + "..." + address.slice(-4)}
      </button>
    </ProfileCard>
  );
};
