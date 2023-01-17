import { Intercom, useWallet, Receiver } from "@relaycc/receiver";
import React, { FunctionComponent, ReactNode, useEffect } from "react";
import { useSigner } from "wagmi";
import { Footer } from "components/Footer";
import { Project } from "lib";

export const Page: FunctionComponent<{
  children: ReactNode;
  navBar?: ReactNode;
  setCategory: (category: Project["category"]) => unknown;
  category: Project["category"];
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
      data-theme="relay"
      className="w-screen min-h-screen flex flex-row justify-center overflow-scroll bg-blue-100"
     // style={{background: 'url(${background.})'}}
    >
      <div className="relative container mx-auto flex flex-col align-center p-8 pt-0">
        {navBar}
        <nav className="w-full mt-28 mb-7 border-b-2 border-blue-800">
          <ul className="button-grp h-14 mb-4 flex overflow-x-scroll items-center gap-5">
            <li
              onClick={() => {
                setCategory("general");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 btn-active cursor-pointer text-xl ${
                category === "general" && "indigo-900 bg-blue-400"
              }`}
            >
              General
            </li>
            <li
              onClick={() => {
                setCategory("new");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl ${
                category === "new" && "text-indigo-900 bg-blue-400"
              }`}
            >
              New
            </li>
            <li
              onClick={() => {
                setCategory("lens");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl whitespace-nowrap ${
                category === "lens" && "text-indigo-900 bg-blue-400"
              }`}
            >
              Lens
            </li>
            <li
              onClick={() => {
                setCategory("music");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl ${
                category === "music" && "text-indigo-900 bg-blue-400"
              }`}
            >
              Music
            </li>
            <li
              onClick={() => {
                setCategory("identity");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl ${
                category === "identity" && "text-indigo-900 bg-blue-400"
              }`}
            >
              Identity
            </li>
            <li
              onClick={() => {
                setCategory("dao");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl ${
                category === "dao" && "text-indigo-900 bg-blue-400"
              }`}
            >
              DAO
            </li>
            <li
              onClick={() => {
                setCategory("defi");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl ${
                category === "defi" && "text-indigo-900 bg-blue-400"
              }`}
            >
              DeFi
            </li>
            <li
              onClick={() => {
                setCategory("zk");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl ${
                category === "zk" && "text-indigo-900 bg-blue-400"
              }`}
            >
              ZK
            </li>
            <li
              onClick={() => {
                setCategory("impactdao");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl ${
                category === "impactdao" && "indigo-900 bg-blue-400"
              }`}
            >
              ImpactDAO
            </li>
            <li
              onClick={() => {
                setCategory("daotool");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl whitespace-nowrap ${
                category === "daotool" && "indigo-900 bg-blue-400"
              }`}
            >
              DAO Tool
            </li>
            <li
              onClick={() => {
                setCategory("infrastructure");
              }}
              className={`btn bg-blue-200 text-indigo-900 border-indigo-900 border-2 hover:bg-blue-400 cursor-pointer text-xl ${
                category === "infrastructure" && "indigo-900 bg-blue-400"
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
