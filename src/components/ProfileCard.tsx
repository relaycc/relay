import { MotionConfig } from "framer-motion";
import { FunctionComponent } from "react";
import { IconChat } from "./IconChat";
import { IconLinkOut } from "./IconLinkOut";
import { motion } from "framer-motion";

export interface ProfileCardProps {
  topLeftImgUrl: string | JSX.Element;
  topRightImgUrl: string;
  topRightImgOnClick: () => unknown;
  primaryButtonText: string;
  primaryButtonOnClick: () => unknown;
  onClickLinkOut: () => unknown;
  dataCard?: JSX.Element;
}

export const ProfileCard: FunctionComponent<ProfileCardProps> = ({
  topLeftImgUrl,
  topRightImgOnClick,
  topRightImgUrl,
  primaryButtonOnClick,
  primaryButtonText,
  onClickLinkOut,
  dataCard,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      className="w-80 flex flex-col shadow-lg hover:shadow-xl rounded-md bg-accent gap-4 p-4"
    >
      <div className="flex flex-row justify-between">
        <button className="flex justify-center items-center p-0 btn btn-ghost w-28 h-28 rounded-md border-none outline-none">
          {typeof topLeftImgUrl === "string" && (
            /* eslint-disable-next-line */
            <img className="rounded-md" src={topLeftImgUrl} alt="pfp" />
          )}
          {typeof topLeftImgUrl === "string" || topLeftImgUrl}
        </button>
        <button
          onClick={topRightImgOnClick}
          className="flex justify-center items-center p-0 btn btn-ghost btn-white-100 bg-white w-[5rem] h-[5rem] rounded-md"
        >
          {/* eslint-disable-next-line */}
          <img
            className="h-[4rem] w-[4rem]"
            onClick={topRightImgOnClick}
            src={topRightImgUrl}
            alt="logo"
          />
        </button>
      </div>
      {dataCard || <div className="h-40 w-full bg-white rounded-md" />}
      <button
        onClick={onClickLinkOut}
        className="btn btn-ghost w-full border-none rounded-md bg-white"
      >
        <div className="flex flex-row items-center flex-grow justify-between">
          {primaryButtonText}
          <IconLinkOut onClick={() => null} />
        </div>
      </button>
      <button
        onClick={primaryButtonOnClick}
        className="btn btn-ghost w-full border-none rounded-md bg-white"
      >
        <div className="flex flex-row flex-grow justify-start">
          Send a Message
        </div>
        <IconChat />
      </button>
    </motion.div>
  );
};
