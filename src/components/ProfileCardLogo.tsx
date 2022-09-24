import { FunctionComponent } from "react";
import { ProfileCard } from "./ProfileCard";

export interface ProfileCardLogoProps {
  logo: string;
  handle?: string | null;
  title: string;
  logoWrapperClassName?: string;
  logoClassName?: string;
}

export const ProfileCardLogo: FunctionComponent<ProfileCardLogoProps> = ({
  logo,
  handle,
  title,
  logoClassName,
  logoWrapperClassName,
}) => {
  return (
    <ProfileCard>
      <div
        className={`relative group flex flex-col items-center p-0 w-full flex-grow`}
      >
        <div
          className={`mt-6 w-full rounded-md p-2 flex flex-row justify-center items-center ${logoWrapperClassName}`}
        >
          {/* eslint-disable-next-line */}
          <img src={logo} alt={title} className={`${logoClassName} w-[8rem]`} />
        </div>

        <h2 className="bg-secondary border-[3px] overflow-hidden  border-black rounded-md m-0 mt-auto uppercase h-12 font-bold flex flex-row w-full justify-center items-center">
          {handle || title}
        </h2>
      </div>
    </ProfileCard>
  );
};
