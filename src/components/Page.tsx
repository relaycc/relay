import React, { FunctionComponent, ReactNode } from "react";
import { Window } from "@relaycc/receiver";
import { NavBar } from "./NavBar";
import { AvatarLauncher } from "./AvatarLauncher";

export const Page: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <main
      data-theme="retro"
      className="w-screen min-h-screen flex flex-row justify-center overflow-scroll bg-white"
    >
      <div className="container mx-auto flex flex-col align-center flex-grow p-8">
        <NavBar />
        <ul className="flex flex-row basis-1/4 flex-wrap gap-8">{children}</ul>
      </div>
      <Window />
      <AvatarLauncher />
    </main>
  );
};
