import React, { FunctionComponent, ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
  text?: string;
  textClassName?: string;
}

export const Header: FunctionComponent<HeaderProps> = ({
  text,
  children,
  textClassName,
}) => {
  return (
    <header className="p-0 m-0 flex w-full justify-center items-center">
      <h1
        className={`bg-none h-full uppercase text-xl font-bold rounded-md flex justify-center items-center m-0 ${textClassName}`}
      >
        {text}
      </h1>
      {children}
    </header>
  );
};
