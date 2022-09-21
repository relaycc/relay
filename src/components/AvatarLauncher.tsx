import { useLaunch, useIsOpen, useEnsAvatar } from "@relaycc/receiver";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { type } from "os";

export const AvatarLauncher = () => {
  const launch = useLaunch();
  const isOpen = useIsOpen();
  const router = useRouter();
  const handle =
    typeof router.query.handle === "string" ? router.query.handle : undefined;
  const ensAvatar = useEnsAvatar({ handle });

  return (
    <motion.img
      alt="ENS Avatar"
      src={
        typeof ensAvatar.avatar === "string" ? ensAvatar.avatar : "/Relay.png"
      }
      initial={{ opacity: isOpen ? 1 : 0 }}
      animate={{ opacity: isOpen ? 0 : 1 }}
      onClick={() => launch(handle)}
      className={`w-28 h-28 rounded-full fixed right-8 bottom-8 overflow-hidden ${
        isOpen ? "opacity-0" : "opacity-100 cursor-pointer"
      } shadow-xl hover:shadow-2xl`}
    />
  );
};
