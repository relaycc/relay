import React, { FunctionComponent, ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
  text?: string;
  onClick?: () => unknown;
  textClassName?: string;
}

export const Header: FunctionComponent<HeaderProps> = ({
  onClick,
  text,
  children,
  textClassName,
}) => {
  return (
    <header className="p-0 m-0 w-full flex flex-row justify-between items-center">
      <h1
        className={`bg-none h-full uppercase text-2xl font-bold rounded-md flex flex-row flex-grow items-center m-0 mr-4 pl-4 ${textClassName}`}
      >
        {text}
      </h1>
      {children}
    </header>
  );
};
