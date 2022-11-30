import React, { FunctionComponent, ReactNode } from "react";
import { useLaunch } from "@relaycc/receiver";

export interface DataRowProps {
  children?: ReactNode;
  onClick?: (() => unknown) | undefined;
  className?: string;
  setAddressToMessage: (e: string) => any;
  handle: string;
  useLaunch?: () => unknown;
}

export const DataRow: FunctionComponent<DataRowProps> = ({
  onClick,
  children,
  className,
  setAddressToMessage,
  handle,
}) => {
  const launch = useLaunch();

  const handleClick = () => {
    onClick;
    setAddressToMessage(handle);
    launch(handle);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-ghost p-0 pl-4 pr-4 rounded-md border-[3px] border-black flex flex-grow flex-row justify-between ${className}`}
    >
      {children}
    </button>
  );
};
