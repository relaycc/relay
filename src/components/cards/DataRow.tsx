import React, { FunctionComponent, ReactNode } from "react";

export interface DataRowProps {
  children?: ReactNode;
  onClick?: (() => unknown) | undefined;
  className?: string;
  setAddressToMessage: any;
  handle: string;
  useLaunch: () => unknown;
}

export const DataRow: FunctionComponent<DataRowProps> = ({
  onClick,
  children,
  className,
  setAddressToMessage,
  handle,
  useLaunch,
}) => {

  const launch = useLaunch()
  const handleClick = () => {
    onClick;
    setAddressToMessage(handle);
    launch
    console.log(handle);
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
