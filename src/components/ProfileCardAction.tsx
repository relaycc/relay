import React, { ReactNode, FunctionComponent } from "react";
import { ProfileCard } from "./ProfileCard";
import { IconDotMenu } from "./IconDotMenu";

export interface ProfileCardProps {
  children: ReactNode;
}

export const ProfileCardAction: FunctionComponent<ProfileCardProps> = ({
  children,
}) => {
  return (
    <ProfileCard>
      {children}
      <ProfileCardActionRow>
        <ProfileCardActionItem className="mr-auto">
          <IconDotMenu />
        </ProfileCardActionItem>
        <ProfileCardActionItemWide>Message</ProfileCardActionItemWide>
      </ProfileCardActionRow>
    </ProfileCard>
  );
};

const ProfileCardActionRow: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className="flex justify-end gap-4 mt-auto">{children}</div>;
};

const ProfileCardActionItem: FunctionComponent<{
  children: React.ReactNode;
  onClick?: () => unknown;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} btn btn-ghost p-0 flex justify-center items-center h-12 w-12 border-none rounded-md bg-white`}
    >
      {children}
    </button>
  );
};

const ProfileCardActionItemWide: FunctionComponent<{
  children: React.ReactNode;
  onClick?: () => unknown;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} btn btn-ghost p-0 flex justify-center items-center h-12 w-28 border-none rounded-md bg-secondary`}
    >
      {children}
    </button>
  );
};
