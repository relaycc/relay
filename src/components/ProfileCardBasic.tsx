import { IconChat } from "./icons/IconChat";
import { IconLinkOut } from "./icons/IconLinkOut";
import { ProfileCard } from "./ProfileCard";
import { ProfileCardHeader } from "./ProfileCardHeader";
import { FunctionComponent } from "react";
import { ProfileCardDataRow } from "./ProfileCardDataRow";

export const ProfileCardBasic: FunctionComponent<{
  logo: string;
  logoAlt: string;
  title: string;
  onClickLinkOut?: () => unknown;
  onClickSendMessage: () => unknown;
  onClickLogo: () => unknown;
  linkOutText: string;
  logoClassName?: string;
}> = ({
  title,
  logo,
  logoAlt,
  onClickLinkOut,
  onClickSendMessage,
  linkOutText,
  logoClassName,
  onClickLogo,
}) => {
  return (
    <ProfileCard>
      <ProfileCardHeader text={title}>
        <button
          onClick={onClickLogo}
          className="btn btn-ghost flex justify-center items-center p-2 bg-white w-[5rem] h-[5rem] rounded-md"
        >
          {/* eslint-disable-next-line */}
          <img
            src={logo}
            alt={logoAlt}
            className={`h-[4rem] w-[4rem] ${logoClassName}`}
          />
        </button>
      </ProfileCardHeader>
      <ProfileCardDataRow className="mt-auto" onClick={onClickSendMessage}>
        Send A Message <IconChat />
      </ProfileCardDataRow>
      <ProfileCardDataRow
        className={`${
          onClickLinkOut === undefined ? "btn-disabled" : "bg-secondary"
        }`}
        onClick={onClickLinkOut}
      >
        {linkOutText}
        <IconLinkOut />
      </ProfileCardDataRow>
    </ProfileCard>
  );
};
