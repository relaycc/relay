import React, { FunctionComponent, ReactNode } from "react";
import {
  useLaunch,
  isLensName,
  isEnsName,
  isEthAddress,
} from "@relaycc/receiver";

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
    if (isEthAddress(handle) || isEnsName(handle) || isLensName(handle)) {
      launch(handle);
    } else {
      launch({ id: "no project", handle });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-ghost p-0 pl-4 pr-4 rounded-md border-[3px] 
      ${
        handle === "" || handle === null || handle === undefined
          ? "border-black"
          : "border-indigo-900"
      } flex flex-grow flex-row justify-between ${className}`}
    >
      {children}
    </button>
  );
};
