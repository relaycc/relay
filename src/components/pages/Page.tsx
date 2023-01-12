import { Intercom, SignerWallet, useWallet, Receiver } from "@relaycc/receiver";
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { NavBar } from "../NavBar";
import { useSigner } from "wagmi";
import { AppCard, LogoCard, HoverToggle } from "components";
import { general } from "../../../public/general";
import { lens } from "../../../public/lens";
import { identity } from "../../../public/identity";
import { music } from "../../../public/music";
import { impactdao } from "../../../public/impactdao";
import { defi } from "../../../public/defi";
import { dao } from "../../../public/dao";
import { zk } from "../../../public/zk";
import { daotool } from "../../../public/daotool";
import { infrastructure } from "../../../public/infrastructure";
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
          return signer;
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
                setCategory(general);
              }}
              className={`cursor-pointer text-xl ${
                category === general && "underline text-blue-800"
              }`}
            >
              General
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
                setCategory(dao);
              }}
              className={`cursor-pointer text-xl ${
                category === dao && "underline text-blue-800"
              }`}
            >
              DAO
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
            <li
              onClick={() => {
                setCategory(zk);
              }}
              className={`cursor-pointer text-xl ${
                category === zk && "underline text-blue-800"
              }`}
            >
              ZK
            </li>
            <li
              onClick={() => {
                setCategory(impactdao);
              }}
              className={`cursor-pointer text-xl ${
                category === impactdao && "underline text-blue-800"
              }`}
            >
              ImpactDAO
            </li>
            <li
              onClick={() => {
                setCategory(daotool);
              }}
              className={`cursor-pointer text-xl whitespace-nowrap ${
                category === daotool && "underline text-blue-800"
              }`}
            >
              DAO Tool
            </li>
            <li
              onClick={() => {
                setCategory(infrastructure);
              }}
              className={`cursor-pointer text-xl ${
                category === infrastructure && "underline text-blue-800"
              }`}
            >
              Infrastructure
            </li>
          </ul>
        </nav>
        <ul className="flex flex-row justify-center sm:justify-start flex-wrap gap-8">
          {children}
        </ul>
        <Footer />
      </div>
      <Intercom>
        <Receiver />
      </Intercom>
    </main>
  );
};
