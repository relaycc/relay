import React, { FunctionComponent, useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ProfileCard } from "./ProfileCard";

export interface ProfileCardLoadingProps {
  topRightImgUrl: string;
  shouldPulse?: boolean;
  invert?: boolean;
}

export const ProfileCardLoading: FunctionComponent<ProfileCardLoadingProps> = ({
  topRightImgUrl,
  shouldPulse,
  invert,
}) => {
  const animate = { opacity: 1 };
  const [random1, setRandom1] = useState(0);
  const [random2, setRandom2] = useState(0);

  useEffect(() => {
    setRandom1(Math.random());
    setRandom2(Math.random());
  }, []);

  return (
    <ProfileCard>
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
            className="flex justify-center items-center p-0 bg-gray-300 w-40 h-[5rem] rounded-md border-none outline-none"
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

        {random1 < 0.5 ? (
          <>
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
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={animate}
            className="flex justify-end w-full border-none rounded-md bg-gray-300 h-28"
          />
        )}

        {random2 < 0.5 ? (
          <>
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
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={animate}
            className="flex justify-end w-full border-none rounded-md bg-gray-300 h-28"
          />
        )}
      </MotionConfig>
    </ProfileCard>
  );
};
