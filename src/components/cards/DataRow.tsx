import React, { FunctionComponent, ReactNode } from "react";

export interface DataRowProps {
  children?: ReactNode;
  onClick?: (() => unknown) | undefined;
  className?: string;
}

export const DataRow: FunctionComponent<DataRowProps> = ({
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
