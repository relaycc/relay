import React, { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";

export interface ProfileCardHeaderProps {
  children?: ReactNode;
  text?: string;
  onClick?: () => unknown;
}

export const ProfileCardHeader: FunctionComponent<ProfileCardHeaderProps> = ({
  onClick,
  text,
  children,
}) => {
  return (
    <header className="p-0 m-0 w-full flex flex-row justify-between items-center">
      <h1 className="bg-none h-full uppercase text-2xl font-bold rounded-md flex flex-row flex-grow items-center m-0 mr-4 pl-4">
        {text}
      </h1>
      {children}
    </header>
  );
};
