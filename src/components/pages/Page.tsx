import { Intercom, SignerWallet, useWallet, Window } from "@relaycc/receiver";
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { NavBar } from "../NavBar";
import { useSigner } from "wagmi";
import { AppCard, LogoCard, HoverToggle } from "components";
import { popular } from "../../../public/popular";
import { lens } from "../../../public/lens";
import { identity } from "../../../public/identity";
import { music } from "../../../public/music";
import { impactdaos } from "../../../public/impactdaos";
import { defi } from "../../../public/defi";
import { Footer } from "components/Footer";

export const Page: FunctionComponent<{
  children: ReactNode;
  navBar?: ReactNode;
  setCategory: (e: any) => unknown;
  category: any;
}> = ({ children, navBar, setCategory, category }) => {
  const { data: signer } = useSigner();
  const [, setWallet] = useWallet();

  useEffect(() => {
    setWallet(
      (() => {
        if (signer === null || signer === undefined) {
          return null;
        } else {
          return { id: "signer wallet", wallet: signer };
        }
      })()
    );
  }, [setWallet, signer]);

  return (
    <main
      data-theme="retro"
      className="w-screen min-h-screen flex flex-row justify-center overflow-scroll bg-blue-100"
    >
      <div className="relative container mx-auto flex flex-col align-center flex-grow p-8">
        {navBar}
        <nav className="w-full mb-7 border-b-2 border-blue-800">
          <ul className="h-14 flex items-center gap-5 overflow-x-scroll">
            <li
              onClick={() => {
                setCategory(popular);
              }}
              className={`cursor-pointer text-xl ${
                category === popular && "underline text-blue-800"
              }`}
            >
              Popular
            </li>
            <li
              onClick={() => {
                setCategory(lens);
              }}
              className={`cursor-pointer text-xl ${
                category === lens && "underline text-blue-800"
              }`}
            >
              Lens
            </li>
            <li
              onClick={() => {
                setCategory(identity);
              }}
              className={`cursor-pointer text-xl ${
                category === identity && "underline text-blue-800"
              }`}
            >
              Identity
            </li>
            <li
              onClick={() => {
                setCategory(music);
              }}
              className={`cursor-pointer text-xl ${
                category === music && "underline text-blue-800"
              }`}
            >
              Music
            </li>
            <li
              onClick={() => {
                setCategory(impactdaos);
              }}
              className={`cursor-pointer text-xl ${
                category === impactdaos && "underline text-blue-800"
              }`}
            >
              ImpactDAOs
            </li>
            <li
              onClick={() => {
                setCategory(defi);
              }}
              className={`cursor-pointer text-xl ${
                category === defi && "underline text-blue-800"
              }`}
            >
              DeFi
            </li>
          </ul>
        </nav>
        <ul className="flex flex-row justify-center sm:justify-start flex-wrap gap-8">
          {children}
        </ul>
        <Footer />
      </div>
      <Intercom>
        <Window />
      </Intercom>
    </main>
  );
};
