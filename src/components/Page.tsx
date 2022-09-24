import React, { FunctionComponent, ReactNode } from "react";
import { NavBar } from "./NavBar";

export const Page: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <main
      data-theme="retro"
      className="w-screen min-h-screen flex flex-row justify-center overflow-scroll bg-blue-100"
    >
      <div className="relative container mx-auto flex flex-col align-center flex-grow p-8">
        <NavBar />
        <ul className="flex flex-row justify-center sm:justify-start flex-wrap gap-8">
          {children}
        </ul>
      </div>
    </main>
  );
};
