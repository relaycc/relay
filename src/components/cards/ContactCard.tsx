import {
  isEthAddress,
  useEnsAvatar,
  useLaunch,
  useEnsName,
  isEnsName,
} from "@relaycc/receiver";
import Blockies from "react-blockies";
import { Card } from "./Card";
import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export const ContactCard: FunctionComponent<{
  address: string | undefined;
  display?: string;
}> = ({ address, display }) => {
  const router = useRouter();
  const launch = useLaunch();
  const ensAvatar = useEnsAvatar({
    handle: isEthAddress(address) ? address : null,
  });
  const ensName = useEnsName({
    handle: isEthAddress(address) ? address : null,
  });

  const pfp = (() => {
    if (ensAvatar.data === null || ensAvatar.data === undefined) {
      return (
        <Blockies
          className={ensAvatar.isLoading ? "opacity-25" : ""}
          seed={address!.toLocaleLowerCase()}
          size={14}
          scale={19}
        />
      );
    } else {
      return (
        /* eslint-disable-next-line */
        <img
          className="h-[19rem] w-[19rem]"
          alt="PFP"
          src={ensAvatar.data || undefined}
        />
      );
    }
  })();

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-grow justify-center overflow-hidden ml-[-1.5rem] mr-[-1.5rem] mt-[-1.5rem] h-[19rem] w-[19rem]">
        <motion.button
          whileHover={{ scale: 1.2 }}
          className="relative p-0 mb-0 w-[full] overflow-hidden"
          onClick={() => router.push("/u/" + address)}
        >
          {pfp}
        </motion.button>
      </div>
      <button
        className="border-none bg-none mt-auto text-2xl font-bold flex flex-grow justify-center items-center min-h-18"
        onClick={() => launch(address)}
      >
        {typeof display === "string"
          ? display
          : isEnsName(ensName.data)
          ? ensName.data
          : address!.slice(0, 6) + "..." + address!.slice(-4)}
      </button>
    </Card>
  );
};
