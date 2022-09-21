import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export const MOTION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.5 } },
  },
  fadeOut: {
    initial: { opacity: 1 },
    hover: { opacity: 0, transition: { duration: 0.5 } },
  },
};

export const ProfileCard = ({ children }: { children?: ReactNode }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      className="w-[21rem] h-[26rem] flex flex-col shadow-lg hover:shadow-xl rounded-md bg-blue-100 gap-4 p-4 border-[3px] border-black"
    >
      {children}
    </motion.div>
  );
};
