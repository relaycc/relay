import React, { FunctionComponent } from "react";
import { IconChat } from "./IconChat";
import { IconLinkOut } from "./IconLinkOut";
import { MotionConfig, motion, AnimationProps } from "framer-motion";

export interface ProfileCardPlaceholderProps {
  topRightImgUrl: string;
  shouldPulse?: boolean;
  invert?: boolean;
}

export const ProfileCardPlaceholder: FunctionComponent<
  ProfileCardPlaceholderProps
> = ({ topRightImgUrl, shouldPulse, invert }) => {
  const animate = { opacity: 1 };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      className="w-80 flex flex-col shadow-lg hover:shadow-xl rounded-md bg-gray-200 gap-4 p-4"
    >
      <MotionConfig
        transition={
          shouldPulse
            ? {
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0,
                duration: 1.25,
              }
            : undefined
        }
      >
        <div className="flex flex-row justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={animate}
            className="flex justify-center items-center p-0 bg-gray-300 w-28 h-28 rounded-md border-none outline-none"
          />
          <motion.button
            initial={{ opacity: 0 }}
            animate={animate}
            className={`flex justify-center items-center p-0 ${
              invert ? "bg-black" : "bg-white"
            } w-[5rem] h-[5rem] rounded-md`}
          >
            {/* eslint-disable-next-line */}
            <img
              className="h-[4rem] w-[4rem]"
              src={topRightImgUrl}
              alt="logo"
            />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={animate}
          className="h-40 w-ful bg-gray-300 rounded-md"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={animate}
          className="flex justify-end w-full border-none rounded-md bg-gray-300 h-12"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={animate}
          className="flex justify-end w-full border-none rounded-md bg-gray-300 h-12"
        />
      </MotionConfig>
    </motion.div>
  );
};
