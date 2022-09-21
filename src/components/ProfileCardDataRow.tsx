import React, { FunctionComponent, ReactNode } from "react";

export interface ProfileCardDataRowProps {
  children?: ReactNode;
  onClick?: () => unknown;
  className?: string;
}

export const ProfileCardDataRow: FunctionComponent<ProfileCardDataRowProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-ghost p-0 pl-4 pr-4 w-full rounded-md bg-white border-[3px] border-black flex flex-row justify-between ${className}`}
    >
      {children}
    </button>
  );
};
