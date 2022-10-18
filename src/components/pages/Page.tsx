import { Intercom, useWallet, Window } from "@relaycc/receiver";
import React, { FunctionComponent, ReactNode, useEffect } from "react";
import { NavBar } from "../NavBar";
import { useSigner } from "wagmi";

export const Page: FunctionComponent<{
  children: ReactNode;
  navBar?: ReactNode;
}> = ({ children, navBar }) => {
  const { data: signer } = useSigner();
  const [, setWallet] = useWallet();

  useEffect(() => {
    setWallet(signer || null);
  }, [setWallet, signer]);

  return (
    <main
      data-theme="retro"
      className="w-screen min-h-screen flex flex-row justify-center overflow-scroll bg-blue-100"
    >
      <div className="relative container mx-auto flex flex-col align-center flex-grow p-8">
        {navBar || <NavBar />}
        <ul className="flex flex-row justify-center sm:justify-start flex-wrap gap-8">
          {children}
        </ul>
      </div>
      <Intercom>
        <Window />
      </Intercom>
    </main>
  );
};
